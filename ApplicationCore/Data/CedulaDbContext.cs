using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Models;

namespace ApplicationCore.Data;

public partial class CedulaDbContext : DbContext
{
    public CedulaDbContext()
    {
    }

    public CedulaDbContext(DbContextOptions<CedulaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Participant> Participants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Participant>(entity =>
        {
            entity.ToTable("Participant");
            entity.HasIndex(p => p.CompanyName).IsUnique();  
            entity.Property(e => e.ParticipantId)
                .ValueGeneratedOnAdd()
                .HasColumnType("INTEGER");
            entity.Property(e => e.Cedula).HasColumnType("varchar(250)");
            entity.Property(e => e.CompanyName)
                .HasColumnType("varchar(250)");
            entity.Property(e => e.Email).HasColumnType("varchar(250)");
            entity.Property(e => e.Name).HasColumnType("varchar(250)");
            entity.Property(e => e.Phone).HasColumnType("varchar(10)");
            entity.Property(e => e.Title).HasColumnType("varchar(250)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
