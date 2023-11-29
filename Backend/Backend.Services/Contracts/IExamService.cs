using System;
using System.Numerics;
using Backend.Model.Entities;
using Backend.Repository.Repository.Contracts;

namespace Backend.Services.Contracts
{
	public interface IExamService:IRepository<Exam>
	{
        Task<List<Exam>> GetAllDataAsync();

        Task<Exam> GetDataByIdAsync(int id);

        Task<Exam> AddDataAsync(Exam exam);

        Task<Exam> RemoveDataAsync(int id);

        Task<Exam> UpdateDataAsync(Exam exam);
    }
}

