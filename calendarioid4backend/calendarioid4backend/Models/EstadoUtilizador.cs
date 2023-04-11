using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace calendarioid4backend.Models;

public partial class EstadoUtilizador
{
    public int Id { get; set; }

    public string Designacao { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Utilizador> Utilizadors { get; } = new List<Utilizador>();
}
