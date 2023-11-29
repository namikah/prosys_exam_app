using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model.Entities;
using Backend.Repository.DataContext;
using Backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            var lessons = await _lessonService.GetAllDataAsync();

            return Ok(new { code = 200, desc = "success", data = lessons });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Lesson lesson)
        {
            await _lessonService.AddDataAsync(lesson);

            return Ok(new { code = 200, desc = "success", data = lesson });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Lesson lesson)
        {
            var updatedlesson = await _lessonService.UpdateDataAsync(lesson);

            if (updatedlesson.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success" , data = updatedlesson });
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var removedlesson = await _lessonService.RemoveDataAsync(id);

            if (removedlesson.Id == 0)
                return NotFound(new { code = 404, desc = "not found" });

            return Ok(new { code = 200, desc = "success" });
        }
    }
}

