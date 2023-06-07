using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    

    public class ComentarioController : ControllerBase
    {

        private readonly Id4calendariobdContext Context;

        public ComentarioController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Comentario>>> GetComentario()
        {
            return Ok(await Context.Comentarios
                .ToListAsync());
        }

        [HttpGet("Getcomentarios/{id}")]
        public async Task<ActionResult<List<Comentario>>> Getcomentarios(int id)
        {
            try
            {
                var comentarios = await Context.Comentarios.Where(c => c.Ausenciaid == id)
                                                .Join(Context.Utilizadors,
                                                comentario => comentario.Utilizadorid,
                                                user => user.Id,
                                                (comentario, user) => new {
                                                    Comentario = comentario,
                                                    Nome = user.Nome
                                                })
                                                .OrderBy(comentario => comentario.Comentario.Datacriacao)
                                                .ToListAsync();
                if (comentarios == null)
                {
                    return NotFound();
                }

                return Ok(comentarios);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [AllowAnonymous]
        [HttpPost("CreateComentario")]
        public async Task<IActionResult> CreateComentario()
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };

                Comentario newcomentario = JsonConvert.DeserializeObject<Comentario>(task.Result);

                if (newcomentario == null)
                {
                    return BadRequest();
                }

                newcomentario.Idutilizadorcriador = newcomentario.Utilizadorid;
                newcomentario.Datacriacao = DateTime.Now;
                newcomentario.Idutilizadorultimaedicao = newcomentario.Utilizadorid;
                newcomentario.Dataultimaedicao = DateTime.Now;

                

                Context.Comentarios.Add(newcomentario);
                Context.SaveChanges();
                return Ok(200);

            }
            catch (Exception ex)
            {
                return Ok("Error" + ex);
            }

        }

    }
}
