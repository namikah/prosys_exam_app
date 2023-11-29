using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Base;

namespace Backend.Model.Entities
{
    public class Student : IEntity
    {
        public int Id { get; set; }

        [Range(0, 99999)]
        public int Number { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string Name { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string Surname { get; set; }

        public int? GroupId { get; set; }

        public Group? Group { get; set; }

        public ICollection<Exam>? Exams { get; set; }
    }
}

