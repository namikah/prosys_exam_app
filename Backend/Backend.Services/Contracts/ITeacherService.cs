using System;
using System.Numerics;
using Backend.Model.Entities;
using Backend.Repository.Repository.Contracts;

namespace Backend.Services.Contracts
{
	public interface ITeacherService:IRepository<Teacher>
	{
        Task<List<Teacher>> GetAllDataAsync();

        Task<Teacher> GetDataByIdAsync(int id);

        Task<Teacher> AddDataAsync(Teacher teacher);

        Task<Teacher> RemoveDataAsync(int id);

        Task<Teacher> UpdateDataAsync(Teacher teacher);
    }
}

