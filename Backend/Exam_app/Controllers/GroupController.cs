using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Backend.Repository.Repository.Contracts;
using Backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Exam_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class groupController : Controller
    {
        private readonly IGroupService _groupService;

        public groupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            var groups = await _groupService.GetAllDataAsync();

            return Ok(new { code = 200, desc = "success", data = groups });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Group group)
        {
            await _groupService.AddDataAsync(group);

            return Ok(new { code = 200, desc = "success", data = group });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Group group)
        {
            var updatedgroup = await _groupService.UpdateDataAsync(group);

            if (updatedgroup.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success", data = updatedgroup });
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var removedgroup = await _groupService.RemoveDataAsync(id);

            if (removedgroup.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success" });
        }
    }
}

