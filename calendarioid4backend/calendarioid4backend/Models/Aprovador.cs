using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Aprovador
{
    [JsonPropertyName("Id")]
    public int Id { get; set; }
    [JsonPropertyName("Idutilizadorcriador")]
    public int Idutilizadorcriador { get; set; }
    [JsonPropertyName("Datacriacao")]
    public DateTime Datacriacao { get; set; }
    [JsonPropertyName("Idutilizadorultimaedicao")]
    public int Idutilizadorultimaedicao { get; set; }
    [JsonPropertyName("Dataultimaedicao")]
    public DateTime Dataultimaedicao { get; set; }
    [JsonPropertyName("Utilizadorid")]
    public int Utilizadorid { get; set; }
    [JsonPropertyName("Aprovadorid")]
    public int Aprovadorid { get; set; }
    
    public virtual Utilizador AprovadorNavigation { get; set; }
    
    public virtual Utilizador Utilizador { get; set; }
}
