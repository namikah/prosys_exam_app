using System;
using System.Numerics;
using Backend.Model.Entities;
using Backend.Repository.Repository.Contracts;

namespace Backend.Services.Contracts
{
	public interface IGroupService:IRepository<Group>
	{
        Task<List<Group>> GetAllDataAsync();

        Task<Group> GetDataByIdAsync(int id);

        Task<Group> AddDataAsync(Group group);

        Task<Group> RemoveDataAsync(int id);

        Task<Group> UpdateDataAsync(Group group);
    }
}

