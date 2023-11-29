using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Backend.Repository.Repository.Contracts;
using Backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Exam_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : Controller
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var teachers = await _teacherService.GetAllDataAsync();

            return Ok(new { code = 200, desc = "success", data = teachers });
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(Teacher teacher)
        {
            await _teacherService.AddDataAsync(teacher);

            return Ok(new { code = 200, desc = "success", data = teacher });
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(Teacher teacher)
        {
            var updatedTeacher = await _teacherService.UpdateDataAsync(teacher);

            if (updatedTeacher.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code=200, desc = "success", data= updatedTeacher });
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromQuery]int id)
        {
            var removedTeacher = await _teacherService.RemoveDataAsync(id);

            if (removedTeacher.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success", data = removedTeacher });
        }
    }
}

