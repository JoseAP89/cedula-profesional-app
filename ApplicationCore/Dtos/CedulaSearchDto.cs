using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Dtos;

public class CedulaSearchDto
{
    public string MaxResult { get; set; }
    [Required]
    public string IdCedula { get; set; }
    public string Nombre { get; set; }
    public string Materno { get; set; }
    public string Paterno { get; set; }
}
