using Entities;

namespace DataAccess.Abstract.Repository;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> GetByEmailWithRolesAsync(string email);
}