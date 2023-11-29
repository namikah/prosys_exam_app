using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Base;

namespace Backend.Model.Entities
{
    public class Exam : IEntity
    {
        public int Id { get; set; }

        public int? LessonId { get; set; }

        public Lesson? Lesson { get; set; }

        public int? StudentId { get; set; }

        public Student? Student { get; set; }

        public DateTime Date { get; set; }

        [Range(0, 9)]
        public int Score { get; set; }
    }
}

