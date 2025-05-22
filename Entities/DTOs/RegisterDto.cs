namespace Entities.DTOs;

public class RegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public List<string> Roles { get; set; }
}