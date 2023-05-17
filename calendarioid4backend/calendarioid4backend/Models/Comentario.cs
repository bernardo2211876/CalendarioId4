using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Comentario
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
    [JsonPropertyName("Descricao")]
    public string Descricao { get; set; } = null!;
    [JsonPropertyName("Utilizadorid")]
    public int Utilizadorid { get; set; }
    [JsonPropertyName("Ausenciaid")]
    public int Ausenciaid { get; set; }
    [JsonIgnore]
    public virtual Ausencium Ausencia { get; set; } = null!;
    [JsonIgnore]
    public virtual Utilizador Utilizador { get; set; } = null!;
}
