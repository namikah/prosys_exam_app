using System;
using Backend.Repository.Repository;
using System.Numerics;
using Backend.Services.Contracts;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ExamService : EFCoreRepository<Exam>, IExamService
    {
        private readonly AppDbContext _dbContext;

        public ExamService(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
		}

        public async Task<List<Exam>> GetAllDataAsync()
        {
            var exams = await GetAllRelations()
                .Include(x=>x.Lesson)
                .Include(x=>x.Student)
                .AsNoTracking()
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return exams;
        }

        public async Task<Exam> GetDataByIdAsync(int id)
        {
            if (id == null) return new Exam();

            var exam = await GetAsync(id);

            return exam;
        }

        public async Task<Exam> AddDataAsync(Exam exam)
        {
            var existStudent = await _dbContext.Students.FirstOrDefaultAsync(x => x.Id == exam.StudentId);
            var existLesson = await _dbContext.Lessons.FirstOrDefaultAsync(x => x.Id == exam.LessonId);

            exam.Student = existStudent;
            exam.Lesson = existLesson;

            await AddAsync(exam);

            return exam;
        }

        public async Task<Exam> RemoveDataAsync(int id)
        {
            var exam = await GetDataByIdAsync(id);

            if (exam == null) return new Exam();

            await DeleteAsync(exam);

            return exam;
        }

        public async Task<Exam> UpdateDataAsync(Exam exam)
        {
            var existExam = await GetDataByIdAsync(exam.Id);

            if (existExam == null) return new Exam();

            if (exam.StudentId != 0)
            {
                var existStudent = await _dbContext.Students.FirstOrDefaultAsync(x => x.Id == exam.StudentId);
                exam.Student = existStudent;
            }
            if (exam.LessonId != 0)
            {
                var existLesson = await _dbContext.Lessons.FirstOrDefaultAsync(x => x.Id == exam.LessonId);
                exam.Lesson = existLesson;
            }

            await UpdateAsync(exam);

            return exam;
        }
    }
}

