using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class TipoAusencium
{
    public int Id { get; set; }

    public string Designacao { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Ausencium> Ausencia { get; } = new List<Ausencium>();
}
