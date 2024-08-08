using ApplicationCore.Contracts;
using ApplicationCore.Dtos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CedulaController : ControllerBase
    {
        private readonly ISearchCedulaService _searchCedulaService;

        public CedulaController(ISearchCedulaService searchCedulaService)
        {
            _searchCedulaService = searchCedulaService;
        }

        [HttpPost("search")]
        public async Task<ActionResult<CedulaInfoDto>> SearchCedula(CedulaSearchDto search)
        {
            var res = await _searchCedulaService.GetCedulaInfoAsync(search);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

    }
}
