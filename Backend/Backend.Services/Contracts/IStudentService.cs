using System;
using System.Numerics;
using Backend.Model.Entities;
using Backend.Repository.Repository.Contracts;

namespace Backend.Services.Contracts
{
	public interface IStudentService : IRepository<Student>
	{
        Task<List<Student>> GetAllDataAsync();

        Task<Student> GetDataByIdAsync(int id);

        Task<Student> AddDataAsync(Student student);

        Task<Student> RemoveDataAsync(int id);

        Task<Student> UpdateDataAsync(Student student);
    }
}

