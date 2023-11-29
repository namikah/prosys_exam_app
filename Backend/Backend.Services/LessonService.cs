using System;
using Backend.Repository.Repository;
using System.Numerics;
using Backend.Services.Contracts;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class LessonService : EFCoreRepository<Lesson>, ILessonService
    {
        private readonly AppDbContext _dbContext;

        public LessonService(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
		}

        public async Task<List<Lesson>> GetAllDataAsync()
        {
            var lessons = await GetAllRelations()
                .Include(x=>x.Teacher)
                .Include(x=>x.Exams)
                .AsNoTracking()
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return lessons;
        }

        public async Task<Lesson> GetDataByIdAsync(int id)
        {
            if (id == null) return new Lesson();

            var lesson = await GetAsync(id);

            return lesson;
        }

        public async Task<Lesson> AddDataAsync(Lesson lesson)
        {
            var existTeacher = await _dbContext.Teachers.FirstOrDefaultAsync(x => x.Id == lesson.TeacherId);

            lesson.Teacher = existTeacher;

            await AddAsync(lesson);

            return lesson;
        }

        public async Task<Lesson> RemoveDataAsync(int id)
        {
            var lesson = await GetDataByIdAsync(id);

            if (lesson == null) return new Lesson();

            await DeleteAsync(lesson);

            return lesson;
        }

        public async Task<Lesson> UpdateDataAsync(Lesson lesson)
        {
            var existLesson = await GetDataByIdAsync(lesson.Id);

            if (existLesson == null) return new Lesson();

            if (lesson.TeacherId != 0)
            {
                var existTeacher = await _dbContext.Teachers.FirstOrDefaultAsync(x => x.Id == lesson.TeacherId);
                lesson.Teacher = existTeacher;
            }
            await UpdateAsync(lesson);

            return lesson;
        }
    }
}

