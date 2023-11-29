using System;
using System.Numerics;
using Backend.Model.Entities;
using Backend.Repository.Repository.Contracts;

namespace Backend.Services.Contracts
{
	public interface ILessonService:IRepository<Lesson>
	{
        Task<List<Lesson>> GetAllDataAsync();

        Task<Lesson> GetDataByIdAsync(int id);

        Task<Lesson> AddDataAsync(Lesson lesson);

        Task<Lesson> RemoveDataAsync(int id);

        Task<Lesson> UpdateDataAsync(Lesson lesson);
    }
}

