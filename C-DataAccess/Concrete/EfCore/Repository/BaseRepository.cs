using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using DataAccess.Abstract.Repository;
using DataAccess.EfCore.Context;

namespace DataAccess.Concrete.EfCore.Repository;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<T> FindAsync(Expression<Func<T, bool>> predicate)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(predicate);
        return entity ?? throw new Exception($"{typeof(T).Name} not found.");
    }

    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

    public void Update(T entity) => _dbSet.Update(entity);

    public void Remove(T entity) => _dbSet.Remove(entity);

    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}
