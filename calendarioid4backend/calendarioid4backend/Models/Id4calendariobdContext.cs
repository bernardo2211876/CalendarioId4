﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace calendarioid4backend.Models;

public partial class Id4calendariobdContext : DbContext
{
    public Id4calendariobdContext()
    {
    }

    public Id4calendariobdContext(DbContextOptions<Id4calendariobdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Aprovador> Aprovadors { get; set; }

    public virtual DbSet<Ausencium> Ausencia { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<EstadoAusencium> EstadoAusencia { get; set; }

    public virtual DbSet<EstadoUtilizador> EstadoUtilizadors { get; set; }
    
    public virtual DbSet<TipoAusencium> TipoAusencia { get; set; }

    public virtual DbSet<Utilizador> Utilizadors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-A7F0QOT;Database=id4calendariobd;trusted_connection=true;encrypt=false;");

    //DESKTOP-A7F0QOT
    //DESKTOP-RJUJ03S

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aprovador>(entity =>
        {
            entity.ToTable("aprovador");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Aprovadorid).HasColumnName("aprovadorid");
            entity.Property(e => e.Datacriacao)
                .HasColumnType("datetime")
                .HasColumnName("datacriacao");
            entity.Property(e => e.Dataultimaedicao)
                .HasColumnType("datetime")
                .HasColumnName("dataultimaedicao");
            entity.Property(e => e.Idutilizadorcriador).HasColumnName("idutilizadorcriador");
            entity.Property(e => e.Idutilizadorultimaedicao).HasColumnName("idutilizadorultimaedicao");
            entity.Property(e => e.Utilizadorid).HasColumnName("utilizadorid");

            entity.HasOne(d => d.AprovadorNavigation).WithMany(p => p.AprovadorAprovadorNavigations)
                .HasForeignKey(d => d.Aprovadorid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_aprovador_utilizador_aprovador");

            entity.HasOne(d => d.Utilizador).WithMany(p => p.AprovadorUtilizadors)
                .HasForeignKey(d => d.Utilizadorid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_aprovador_utilizador_utilizador");
        });

        modelBuilder.Entity<Ausencium>(entity =>
        {
            entity.ToTable("ausencia");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Datacriacao)
                .HasColumnType("datetime")
                .HasColumnName("datacriacao");
            entity.Property(e => e.Datahorafim)
                .HasColumnType("datetime")
                .HasColumnName("datahorafim");
            entity.Property(e => e.Datahorainicio)
                .HasColumnType("datetime")
                .HasColumnName("datahorainicio");
            entity.Property(e => e.Dataultimaedicao)
                .HasColumnType("datetime")
                .HasColumnName("dataultimaedicao");
            entity.Property(e => e.Estadoid).HasColumnName("estadoid");
            entity.Property(e => e.Idutilizadorcriador).HasColumnName("idutilizadorcriador");
            entity.Property(e => e.Idutilizadorultimaedicao).HasColumnName("idutilizadorultimaedicao");
            entity.Property(e => e.Motivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("motivo");
            entity.Property(e => e.Tipoid).HasColumnName("tipoid");
            entity.Property(e => e.Utilizadorid).HasColumnName("utilizadorid");

            entity.HasOne(d => d.Estado).WithMany(p => p.Ausencia)
                .HasForeignKey(d => d.Estadoid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ausencia_estado_ausencia");

            entity.HasOne(d => d.Tipo).WithMany(p => p.Ausencia)
                .HasForeignKey(d => d.Tipoid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ausencia_tipo_ausencia");

            entity.HasOne(d => d.Utilizador).WithMany(p => p.Ausencia)
                .HasForeignKey(d => d.Utilizadorid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ausencia_utilizador");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.ToTable("comentario");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Ausenciaid).HasColumnName("ausenciaid");
            entity.Property(e => e.Datacriacao)
                .HasColumnType("datetime")
                .HasColumnName("datacriacao");
            entity.Property(e => e.Dataultimaedicao)
                .HasColumnType("datetime")
                .HasColumnName("dataultimaedicao");
            entity.Property(e => e.Descricao)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("descricao");
            entity.Property(e => e.Idutilizadorcriador).HasColumnName("idutilizadorcriador");
            entity.Property(e => e.Idutilizadorultimaedicao).HasColumnName("idutilizadorultimaedicao");
            entity.Property(e => e.Utilizadorid).HasColumnName("utilizadorid");

            entity.HasOne(d => d.Ausencia).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.Ausenciaid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_comentario_ausencia");

            entity.HasOne(d => d.Utilizador).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.Utilizadorid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_comentario_utilizador");
        });

        modelBuilder.Entity<EstadoAusencium>(entity =>
        {
            entity.ToTable("estado_ausencia");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Designacao)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("designacao");
        });

        modelBuilder.Entity<EstadoUtilizador>(entity =>
        {
            entity.ToTable("estado_utilizador");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Designacao)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("designacao");
        });

        modelBuilder.Entity<TipoAusencium>(entity =>
        {
            entity.ToTable("tipo_ausencia");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Designacao)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("designacao");
        });

        modelBuilder.Entity<Utilizador>(entity =>
        {
            entity.ToTable("utilizador");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Codpostal)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("codpostal");
            entity.Property(e => e.Datacriacao)
                .HasColumnType("datetime")
                .HasColumnName("datacriacao");
            entity.Property(e => e.Dataultimaedicao)
                .HasColumnType("datetime")
                .HasColumnName("dataultimaedicao");
            entity.Property(e => e.Email)
                .HasMaxLength(90)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Estadoid).HasColumnName("estadoid");
            entity.Property(e => e.Funcao)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("funcao");
            entity.Property(e => e.Idutilizadorcriador).HasColumnName("idutilizadorcriador");
            entity.Property(e => e.Idutilizadorultimaedicao).HasColumnName("idutilizadorultimaedicao");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.Morada)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("morada");
            entity.Property(e => e.Nif).HasColumnName("nif");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Telemovel).HasColumnName("telemovel");

            entity.HasOne(d => d.Estado).WithMany(p => p.Utilizadors)
                .HasForeignKey(d => d.Estadoid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_utilizador_estado_utilizador");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}