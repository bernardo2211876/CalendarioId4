using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace calendarioid4backend.Models;

public partial class Utilizador
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
    public DateTime? Dataultimaedicao { get; set; }
    [JsonPropertyName("Nome")]
    public string Nome { get; set; } = null!;
    [JsonPropertyName("Email")]
    public string Email { get; set; } = null!;
    [JsonPropertyName("Password")]
    [MaxLength(200)]
    public string Password { get; set; } = null!;
    [JsonPropertyName("Nif")]
    public int Nif { get; set; }
    [JsonPropertyName("Codpostal")]
    public string Codpostal { get; set; } = null!;
    [JsonPropertyName("Morada")]
    public string Morada { get; set; } = null!;
    [JsonPropertyName("Telemovel")]
    public int Telemovel { get; set; }
    [JsonPropertyName("Funcao")]
    public string Funcao { get; set; } = null!;
    [JsonPropertyName("IsAdmin")]
    public bool IsAdmin { get; set; }
    [JsonPropertyName("Estadoid")]
    public int Estadoid { get; set; }

    public virtual ICollection<Aprovador> AprovadorAprovadorNavigations { get; } = new List<Aprovador>();

    public virtual ICollection<Aprovador> AprovadorUtilizadors { get; } = new List<Aprovador>();

    public virtual ICollection<Ausencium> Ausencia { get; } = new List<Ausencium>();

    public virtual ICollection<Comentario> Comentarios { get; } = new List<Comentario>();

    public virtual EstadoUtilizador Estado { get; set; } = null!;
}
