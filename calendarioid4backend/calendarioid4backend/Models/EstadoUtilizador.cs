using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class EstadoUtilizador
{
    public int Id { get; set; }

    public string Designacao { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Utilizador> Utilizadors { get; } = new List<Utilizador>();
}
