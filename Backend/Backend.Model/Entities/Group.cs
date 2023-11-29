using System;
using System.ComponentModel.DataAnnotations;
using Backend.Model.Base;

namespace Backend.Model.Entities
{
    public class Group : IEntity
    {
        public int Id { get; set; }

        [Range(0, 99)]
        public int Number { get; set; }

        public ICollection<Lesson>? Lessons { get; set; }

        public ICollection<Student>? Students { get; set; }
    }
}

