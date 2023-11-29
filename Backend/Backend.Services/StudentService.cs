using System;
using Backend.Repository.Repository;
using System.Numerics;
using Backend.Services.Contracts;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class StudentService : EFCoreRepository<Student>, IStudentService
    {
        private readonly AppDbContext _dbContext;

        public StudentService(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;

        }

        public async Task<List<Student>> GetAllDataAsync()
        {
            var students = await GetAllRelations()
                .Include(x => x.Group)
                .Include(x => x.Exams)
                .AsNoTracking()
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            return students;
        }

        public async Task<Student> GetDataByIdAsync(int id)
        {
            if (id == null) return new Student();

            var student = await GetAsync(id);

            return student;
        }

        public async Task<Student> AddDataAsync(Student student)
        {
            var existGroup = await _dbContext.Groups.FirstOrDefaultAsync(x => x.Id == student.GroupId);

            student.Group = existGroup;
            await AddAsync(student);

            return student;
        }

        public async Task<Student> RemoveDataAsync(int id)
        {
            var student = await GetDataByIdAsync(id);

            if (student == null) return new Student();

            await DeleteAsync(student);

            return student;
        }

        public async Task<Student> UpdateDataAsync(Student student)
        {
            var existStudent = await GetDataByIdAsync(student.Id);

            if (existStudent == null) return new Student();

            if (student.GroupId != 0)
            {
                var existGroup = await _dbContext.Groups.FirstOrDefaultAsync(x => x.Id == student.GroupId);
                student.Group = existGroup;
            }

            await UpdateAsync(student);

            return existStudent;
        }
    }
}

