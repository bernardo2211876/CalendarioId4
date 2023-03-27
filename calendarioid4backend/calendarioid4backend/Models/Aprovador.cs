using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Aprovador
{
    public int Id { get; set; }

    public int Idutilizadorcriador { get; set; }

    public DateTime Datacriacao { get; set; }

    public int Idutilizadorultimaedicao { get; set; }

    public DateTime Dataultimaedicao { get; set; }

    public int Utilizadorid { get; set; }

    public int Aprovadorid { get; set; }
    [JsonIgnore]
    public virtual Utilizador AprovadorNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Utilizador Utilizador { get; set; } = null!;
}
