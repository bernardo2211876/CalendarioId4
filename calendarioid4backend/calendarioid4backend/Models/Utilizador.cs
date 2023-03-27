using System;
using System.Collections.Generic;

namespace calendarioid4backend.Models;

public partial class Utilizador
{
    public int Id { get; set; }

    public int Idutilizadorcriador { get; set; }

    public DateTime Datacriacao { get; set; }

    public int Idutilizadorultimaedicao { get; set; }

    public DateTime? Dataultimaedicao { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Nif { get; set; }

    public string Codpostal { get; set; } = null!;

    public string Morada { get; set; } = null!;

    public int Telemovel { get; set; }

    public string Funcao { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public int Estadoid { get; set; }

    public virtual ICollection<Aprovador> AprovadorAprovadorNavigations { get; } = new List<Aprovador>();

    public virtual ICollection<Aprovador> AprovadorUtilizadors { get; } = new List<Aprovador>();

    public virtual ICollection<Ausencium> Ausencia { get; } = new List<Ausencium>();

    public virtual ICollection<Comentario> Comentarios { get; } = new List<Comentario>();

    public virtual EstadoUtilizador Estado { get; set; } = null!;
}
