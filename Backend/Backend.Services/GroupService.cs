using System;
using Backend.Repository.Repository;
using System.Numerics;
using Backend.Services.Contracts;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class GroupService : EFCoreRepository<Group>, IGroupService
    {
		public GroupService(AppDbContext dbContext) : base(dbContext)
        {
		}

        public async Task<List<Group>> GetAllDataAsync()
        {
            var groups = await GetAllRelations()
                .Include(x=>x.Lessons)
                .Include(x=>x.Students)
                .AsNoTracking()
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return groups;
        }

        public async Task<Group> GetDataByIdAsync(int id)
        {
            if (id == null) return new Group();

            var group = await GetAsync(id);

            return group;
        }

        public async Task<Group> AddDataAsync(Group group)
        {
            await AddAsync(group);

            return group;
        }

        public async Task<Group> RemoveDataAsync(int id)
        {
            var group = await GetDataByIdAsync(id);

            if (group == null) return new Group();

            await DeleteAsync(group);

            return group;
        }

        public async Task<Group> UpdateDataAsync(Group group)
        {
            var exisGroup = await GetDataByIdAsync(group.Id);

            if (exisGroup == null) return new Group();

            await UpdateAsync(group);

            return group;
        }
    }
}

