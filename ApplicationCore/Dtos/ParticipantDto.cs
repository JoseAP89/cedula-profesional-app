using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Dtos;

public class ParticipantDto
{
    public long ParticipantId { get; set; }

    [Required]
    public string CompanyName { get; set; }

    [Required]
    public string Cedula { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(7),MaxLength(10)]
    public string Phone { get; set; }
}
