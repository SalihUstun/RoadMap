using DataAccess.Abstract.Repository;
using DataAccess.EfCore.Context;
using Microsoft.EntityFrameworkCore;
using Entities;

namespace DataAccess.Concrete.EfCore.Repository;
public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByEmailWithRolesAsync(string email)
    {
        return await _dbSet.Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }
}