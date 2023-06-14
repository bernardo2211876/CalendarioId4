using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class TipoAusencium
{
    [JsonPropertyName("Id")]
    public int Id { get; set; }
    [JsonPropertyName("Designacao")]
    public string Designacao { get; set; }

    public virtual ICollection<Ausencium> Ausencia { get; } = new List<Ausencium>();
}
