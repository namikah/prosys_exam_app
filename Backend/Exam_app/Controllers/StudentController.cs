using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Backend.Repository.Repository.Contracts;
using Backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Exam_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            var students = await _studentService.GetAllDataAsync();

            return Ok(new { code = 200, desc = "success", data = students });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Student student)
        {
            await _studentService.AddDataAsync(student);

            return Ok(new { code = 200, desc = "success", data = student });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Student student)
        {
            var updatedstudent = await _studentService.UpdateDataAsync(student);

            if (updatedstudent.Id == 0)
                return NotFound(new { code = 404, desc = "not found", data = updatedstudent });

            return Ok(new { code = 200, desc = "success", data = updatedstudent });
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var removedstudent = await _studentService.RemoveDataAsync(id);

            if (removedstudent.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success" });
        }
    }
}

