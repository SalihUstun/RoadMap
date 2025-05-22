using System.Security.Cryptography;
using Business.Abstract;
using Business.Jwt;
using DataAccess.Abstract.Repository;
using DataAccess.EfCore.Context;
using Entities;
using Entities.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Business.Concrete;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly JwtHelper _jwtHelper;
    private readonly AppDbContext _context;

    public AuthService(IUserRepository userRepository,
                       IPasswordHasher<User> passwordHasher,
                       JwtHelper jwtHelper,
                       AppDbContext context)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtHelper = jwtHelper;
        _context = context;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        try
        {
           
            var existingUser = await _context.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Email == registerDto.Email);

            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

           
            var user = new User
            {
                Email = registerDto.Email,
                PasswordHash = _passwordHasher.HashPassword(null, registerDto.Password),
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

           
            var rolesToAssign = new List<UserRole>();

            foreach (var roleName in registerDto.Roles)
            {
                var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
                if (role == null)
                {
                    role = new Role { Name = roleName };
                    _context.Roles.Add(role);
                    await _context.SaveChangesAsync(); 
                }

                rolesToAssign.Add(new UserRole
                {
                    UserId = user.Id,
                    RoleId = role.Id
                });
            }

            _context.UserRoles.AddRange(rolesToAssign);
            await _context.SaveChangesAsync();

            var accessToken = _jwtHelper.GenerateToken(user);

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = user.RefreshToken
            };
        }
        catch (Exception ex)
        {
            throw new Exception("Register failed: " + (ex.InnerException?.Message ?? ex.Message));
        }
    }


    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var user = await _userRepository.GetByEmailWithRolesAsync(loginDto.Email);
        if (user == null)
            throw new Exception("Invalid email or password.");

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
        if (result != PasswordVerificationResult.Success)
            throw new Exception("Invalid email or password.");

        var accessToken = _jwtHelper.GenerateToken(user);
        var refreshToken = GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        _userRepository.Update(user);
        await _userRepository.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        var user = await _context.Users
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow)
            throw new Exception("Invalid or expired refresh token.");

        var newAccessToken = _jwtHelper.GenerateToken(user);
        var newRefreshToken = GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        };
    }

    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }
}
