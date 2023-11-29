using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Backend.Repository.Repository.Contracts;
using Backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Exam_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : Controller
    {
        private readonly IExamService _examService;

        public ExamController(IExamService examService)
        {
            _examService = examService;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            var exams = await _examService.GetAllDataAsync();

            return Ok(new { code = 200, desc = "success", data = exams });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Exam exam)
        {
            await _examService.AddDataAsync(exam);

            return Ok(new { code = 200, desc = "success", data = exam });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Exam exam)
        {
            var updatedexam = await _examService.UpdateDataAsync(exam);

            if (updatedexam.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success", data = updatedexam });
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var removedexam = await _examService.RemoveDataAsync(id);

            if (removedexam.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success" });
        }
    }
}

