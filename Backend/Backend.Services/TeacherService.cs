using System;
using Backend.Repository.Repository;
using System.Numerics;
using Backend.Services.Contracts;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
	public class TeacherService: EFCoreRepository<Teacher>, ITeacherService
    {
		public TeacherService(AppDbContext dbContext) : base(dbContext)
        {
		}

        public async Task<List<Teacher>> GetAllDataAsync()
        {
            var teachers = await GetAllRelations()
                .Include(x=>x.Lessons)
                .AsNoTracking()
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return teachers;
        }

        public async Task<Teacher> GetDataByIdAsync(int id)
        {
            if (id == null) return new Teacher();

            var teacher = await GetAsync(id);

            return teacher;
        }

        public async Task<Teacher> AddDataAsync(Teacher teacher)
        {
            await AddAsync(teacher);

            return teacher;
        }

        public async Task<Teacher> RemoveDataAsync(int id)
        {
            var teacher = await GetDataByIdAsync(id);

            if (teacher == null) return new Teacher();

            await DeleteAsync(teacher);

            return teacher;
        }

        public async Task<Teacher> UpdateDataAsync(Teacher teacher)
        {
            var existTeacher = await GetDataByIdAsync(teacher.Id);

            if (existTeacher == null) return new Teacher();

            await UpdateAsync(teacher);

            return teacher;
        }
    }
}

