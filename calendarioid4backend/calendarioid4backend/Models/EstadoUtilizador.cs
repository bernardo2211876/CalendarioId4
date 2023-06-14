using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class EstadoUtilizador
{
    [JsonPropertyName("Id")]
    public int Id { get; set; }
    [JsonPropertyName("Designacao")]
    public string Designacao { get; set; }

    public virtual ICollection<Utilizador> Utilizadors { get; } = new List<Utilizador>();
}
