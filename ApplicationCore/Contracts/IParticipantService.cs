using ApplicationCore.Dtos;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Contracts;

public interface IParticipantService
{
    Task<Participant> GetParticipantByIdAsync(long id);    
    Task<List<Participant>> GetParticipantsByCedulaIdAsync(string cedulaId);    
    Task<PageContainer<Participant>> GetParticipantsPaginationAsync(int page, int pageSize);
    Task<Participant> AddParticipantAsync(ParticipantDto participant);    
    Task<Participant> UpdateParticipantAsync(ParticipantDto participant);    
    Task<Participant> DeleteParticipantAsync(long participantId);    
}
