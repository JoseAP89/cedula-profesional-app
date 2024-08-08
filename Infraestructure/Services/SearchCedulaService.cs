using ApplicationCore.Contracts;
using ApplicationCore.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Services;

public class SearchCedulaService : ISearchCedulaService
{
    public async Task<CedulaInfoDto> GetCedulaInfoAsync(CedulaSearchDto search)
    {
        if (string.IsNullOrEmpty(search.MaxResult))
        {
            search.MaxResult = "99"; 
        }
        using HttpClient client = new HttpClient();
        string url = $"https://cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action?json={{'maxResult':'{search.MaxResult}','nombre':'{search.Nombre}','paterno':'{search.Paterno}','materno':'{search.Materno}','idCedula':'{search.IdCedula}'}}";
        var res = await client.GetFromJsonAsync<CedulaInfoDto>(url);
        return res;
    }
}
