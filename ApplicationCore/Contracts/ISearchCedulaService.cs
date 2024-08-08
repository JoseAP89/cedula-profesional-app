using ApplicationCore.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Contracts;

public interface ISearchCedulaService
{
    Task<CedulaInfoDto> GetCedulaInfoAsync(CedulaSearchDto search);
}
