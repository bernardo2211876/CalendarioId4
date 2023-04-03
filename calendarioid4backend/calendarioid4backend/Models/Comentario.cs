using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Comentario
{
    public int Id { get; set; }

    public int Idutilizadorcriador { get; set; }

    public DateTime Datacriacao { get; set; }

    public int Idutilizadorultimaedicao { get; set; }

    public DateTime Dataultimaedicao { get; set; }

    public string Descricao { get; set; } = null!;

    public int Utilizadorid { get; set; }

    public int Ausenciaid { get; set; }
    [JsonIgnore]
    public virtual Ausencium Ausencia { get; set; } = null!;
    [JsonIgnore]
    public virtual Utilizador Utilizador { get; set; } = null!;
}
