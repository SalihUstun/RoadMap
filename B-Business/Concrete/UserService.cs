using Business.Abstract;
using DataAccess.Abstract.Repository;
using DataAccess.EfCore.Context;
using Entities;
using Microsoft.EntityFrameworkCore;


namespace Business.Concrete;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly AppDbContext _context;

    public UserService(IUserRepository userRepository, AppDbContext context)
    {
        _userRepository = userRepository;
        _context = context;
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return await _userRepository.GetByEmailWithRolesAsync(email);
    }

    public async Task CreateUserAsync(User user, List<string> roles)
    {
        await _userRepository.AddAsync(user);

        foreach (var roleName in roles)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
            if (role == null)
            {
                role = new Role { Name = roleName };
                _context.Roles.Add(role);
                await _context.SaveChangesAsync();
            }

            var userRole = new UserRole
            {
                User = user,
                Role = role
            };
            _context.UserRoles.Add(userRole);
        }

        await _userRepository.SaveChangesAsync();
    }
}
