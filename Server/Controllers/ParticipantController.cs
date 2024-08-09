using ApplicationCore.Contracts;
using ApplicationCore.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _cedulaService;

        public ParticipantController(IParticipantService cedulaService)
        {
            _cedulaService = cedulaService;
        }

        [HttpGet("{page}/{pageSize}")]
        public async Task<ActionResult<PageContainer<ParticipantDto>>> GetParticipantsPagination(int page, int pageSize)
        {
            try
            {
                var res = await _cedulaService.GetParticipantsPaginationAsync(page, pageSize);
                if (res == null)
                {
                    return NotFound("No se encontraron resultados.");
                }
                var pageContainer = new PageContainer<ParticipantDto>
                {
                    Total = res.Total,
                    Page = res.Page,
                    PageSize = res.PageSize,
                    Items = res.Items.Select(r =>
                        new ParticipantDto
                        {
                            ParticipantId = r.ParticipantId,
                            Cedula = r.Cedula,
                            Name = r.Name,
                            CompanyName = r.CompanyName,
                            Phone = r.Phone,
                            Email = r.Email,
                            Title = r.Title
                        }
                    ).ToList()
                };
                return Ok(pageContainer);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error buscando los participantes.");
            }
        }

        [HttpGet("cedula/{cedulaId}")]
        public async Task<ActionResult<List<ParticipantDto>>> GetParticipantsByCedulaId(string cedulaId)
        {
            try
            {
                var res = await _cedulaService.GetParticipantsByCedulaIdAsync(cedulaId);
                if (res == null)
                {
                    return NotFound("No se encontraron resultados.");
                }
                var participantsDto = res.Select(r =>
                    new ParticipantDto
                    {
                        ParticipantId = r.ParticipantId,
                        Cedula = r.Cedula,
                        Name = r.Name,
                        CompanyName = r.CompanyName,
                        Phone = r.Phone,
                        Email = r.Email,
                        Title =r.Title
                    }
                );
                return Ok(participantsDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error buscando los participantes.");
            }
        }

        [HttpGet("{participantId}")]
        public async Task<ActionResult<ParticipantDto>> GetParticipantById(int participantId)
        {
            try
            {
                var res = await _cedulaService.GetParticipantByIdAsync(participantId);
                if (res == null)
                {
                    return NotFound("No se encontraron resultados.");
                }
                var participantDto = new ParticipantDto
                {
                    ParticipantId = res.ParticipantId,
                    Cedula = res.Cedula,
                    Name = res.Name,
                    CompanyName = res.CompanyName,
                    Phone = res.Phone,
                    Email = res.Email,
                    Title = res.Title
                };
                return Ok(participantDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error buscando al participante.");
            }
        }

        [HttpPost()]
        public async Task<ActionResult<ParticipantDto>> AddParticipant(ParticipantDto participant)
        {
            try
            {
                var res = await _cedulaService.AddParticipantAsync(participant);
                if (res == null)
                {
                    return BadRequest("Hubo un error agregando al participante.");
                }
                var participantDto = new ParticipantDto
                {
                    ParticipantId = res.ParticipantId,
                    Cedula = res.Cedula,
                    Name = res.Name,
                    CompanyName = res.CompanyName,
                    Phone = res.Phone,
                    Email = res.Email,
                    Title = res.Title
                };
                return Ok(participantDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error agregando al participante.");
            }
        }

        [HttpPut()]
        public async Task<ActionResult<ParticipantDto>> UpdateParticipant(ParticipantDto participant)
        {
            try
            {
                var res = await _cedulaService.UpdateParticipantAsync(participant);
                if (res == null)
                {
                    return BadRequest("Hubo un error actualizando al participante.");
                }
                var participantDto = new ParticipantDto
                {
                    ParticipantId = res.ParticipantId,
                    Cedula = res.Cedula,
                    Name = res.Name,
                    CompanyName = res.CompanyName,
                    Phone = res.Phone,
                    Email = res.Email,
                    Title = res.Title
                };
                return Ok(participantDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error actualizando al participante.");
            }
        }

        [HttpDelete("{participantId}")]
        public async Task<ActionResult<ParticipantDto>> DeleteParticipantById(int participantId)
        {
            try
            {
                var res = await _cedulaService.DeleteParticipantAsync(participantId);
                if (res == null)
                {
                    return NotFound("No se encontraron resultados.");
                }
                var participantDto = new ParticipantDto
                {
                    ParticipantId = res.ParticipantId,
                    Cedula = res.Cedula,
                    Name = res.Name,
                    CompanyName = res.CompanyName,
                    Phone = res.Phone,
                    Email = res.Email,
                    Title = res.Title
                };
                return Ok(participantDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Hubo un error borrando al participante.");
            }
        }

    }
}
