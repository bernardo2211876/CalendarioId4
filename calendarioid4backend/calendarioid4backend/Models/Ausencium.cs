using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Ausencium
{
    public int Id { get; set; }

    public int Idutilizadorcriador { get; set; }

    public DateTime Datacriacao { get; set; }

    public int Idutilizadorultimaedicao { get; set; }

    public DateTime Dataultimaedicao { get; set; }

    public int Tipoid { get; set; }

    public DateTime Datahorainicio { get; set; }

    public DateTime Datahorafim { get; set; }

    public string? Motivo { get; set; }

    public int Utilizadorid { get; set; }

    public int Estadoid { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; } = new List<Comentario>();

    public virtual EstadoAusencium Estado { get; set; } = null!;

    public virtual TipoAusencium Tipo { get; set; } = null!;
    [JsonIgnore]
    public virtual Utilizador Utilizador { get; set; } = null!;
}
