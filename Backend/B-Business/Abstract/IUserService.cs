using Entities;

namespace Business.Abstract;


public interface IUserService
{
    Task<User> GetByEmailAsync(string email);
    Task CreateUserAsync(User user, List<string> roles);
}