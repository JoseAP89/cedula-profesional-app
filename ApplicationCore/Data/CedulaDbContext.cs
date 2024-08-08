using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Server;

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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=C:\\Users\\diana\\AppData\\Roaming\\DBeaverData\\workspace6\\.metadata\\sample-database-sqlite-1\\CedulaDB.db;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Participant>(entity =>
        {
            entity.ToTable("Participant");

            entity.Property(e => e.ParticipantId)
                .ValueGeneratedNever()
                .HasColumnType("INT");
            entity.Property(e => e.Cedula).HasColumnType("varchar(250)");
            entity.Property(e => e.CompanyName).HasColumnType("varchar(250)");
            entity.Property(e => e.Email).HasColumnType("varchar(250)");
            entity.Property(e => e.Name).HasColumnType("varchar(250)");
            entity.Property(e => e.Phone).HasColumnType("varchar(10)");
            entity.Property(e => e.Title).HasColumnType("varchar(250)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
