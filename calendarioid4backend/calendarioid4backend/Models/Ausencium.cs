using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Ausencium
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
    [JsonPropertyName("Tipoid")]
    public int Tipoid { get; set; }
    [JsonPropertyName("Datahorainicio")]
    public DateTime Datahorainicio { get; set; }
    [JsonPropertyName("Datahorafim")]
    public DateTime Datahorafim { get; set; }
    [JsonPropertyName("Motivo")]
    public string Motivo { get; set; }
    [JsonPropertyName("Utilizadorid")]
    public int Utilizadorid { get; set; }
    [JsonPropertyName("Estadoid")]
    public int Estadoid { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; } = new List<Comentario>();
 
    public virtual EstadoAusencium Estado { get; set; }
    
    public virtual TipoAusencium Tipo { get; set; }

    public virtual Utilizador Utilizador { get; set; }
}
