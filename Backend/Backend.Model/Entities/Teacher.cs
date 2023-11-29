using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Base;

namespace Backend.Model.Entities
{
	public class Teacher :IEntity
	{
		public int Id { get; set; }

        [Column(TypeName = "varchar(20)")]
        [StringLength(20)]
        public string? Name { get; set; }

        [Column(TypeName = "varchar(20)")]
        [StringLength(20)]
        public string? Surname { get; set; }

        public ICollection<Lesson>? Lessons { get; set; }
    }
}

