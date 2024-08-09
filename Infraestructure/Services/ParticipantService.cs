using ApplicationCore.Contracts;
using ApplicationCore.Data;
using ApplicationCore.Dtos;
using ApplicationCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Services;

public class ParticipantService : IParticipantService
{
    private readonly CedulaDbContext _ctx;

    public ParticipantService(CedulaDbContext _ctx)
    {
        this._ctx = _ctx;
    }

    public async Task<Participant> AddParticipantAsync(ParticipantDto participantdto)
    {
        var participant = new Participant
        {
            Cedula = participantdto.Cedula,
            Name = participantdto.Name.ToUpper(),
            CompanyName = participantdto.CompanyName.ToUpper(),
            Email = participantdto.Email,
            Phone = participantdto.Phone,
            Title = participantdto.Title.ToUpper(),
        };
        _ctx.Participants.Add(participant); 
        await _ctx.SaveChangesAsync();
        return participant;
    }

    public async Task<Participant> DeleteParticipantAsync(long participantId)
    {
        var participant = await _ctx.Participants.FirstOrDefaultAsync(p => p.ParticipantId == participantId);
        if(participant == null) 
        {
            return participant;
        }
        _ctx.Participants.Remove(participant);  
        await _ctx.SaveChangesAsync();
        return participant;
    }

    public async Task<List<Participant>> GetParticipantsByCedulaIdAsync(string cedulaId)
    {
        var participant = await _ctx.Participants
            .Where(p => p.Cedula == cedulaId)
            .ToListAsync();
        return participant;
    }

    public async Task<Participant> GetParticipantByIdAsync(long id)
    {
        var participant = await _ctx.Participants.FirstOrDefaultAsync(p => p.ParticipantId == id);
        return participant;
    }

    public async Task<PageContainer<Participant>> GetParticipantsPaginationAsync(int page, int pageSize)
    {
        int total = await _ctx.Participants.CountAsync();
        var participants = await _ctx.Participants
            .OrderByDescending(p => p.ParticipantId)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToListAsync();
        var pageContainer = new PageContainer<Participant>
        {
            Total = total,
            Page = page,
            PageSize = pageSize,
            Items = participants
        };
        return pageContainer;
    }

    public async Task<Participant> UpdateParticipantAsync(ParticipantDto record)
    {
        var participant = await GetParticipantByIdAsync(record.ParticipantId);
        if (participant == null)
        {
            return participant;
        }
        if (participant.Cedula == record.Cedula && participant.Name == record.Name && 
            participant.CompanyName == record.CompanyName && participant.Email == record.Email &&
            participant.Phone == record.Phone && participant.Title == record.Title)
        {
            return participant; 
        }
        participant.Cedula = record.Cedula;
        participant.Name = record.Name.ToUpper();
        participant.CompanyName = record.CompanyName.ToUpper();
        participant.Email = record.Email;
        participant.Phone = record.Phone;
        participant.Title = record.Title.ToUpper();
        _ctx.Participants.Update(participant); 
        await _ctx.SaveChangesAsync();
        return participant;
    }
}
