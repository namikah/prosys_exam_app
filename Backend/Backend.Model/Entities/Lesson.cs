using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Base;

namespace Backend.Model.Entities
{
	public class Lesson :IEntity
	{
		public int Id { get; set; }

        [Column(TypeName = "char(3)")]
        [StringLength(3)]
        public string Code { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string Name { get; set; }

        public int? TeacherId { get; set; }

        public Teacher? Teacher { get; set; }

        public ICollection<Exam>? Exams { get; set; }
    }
}

