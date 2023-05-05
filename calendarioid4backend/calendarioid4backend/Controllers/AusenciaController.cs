using calendarioid4backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AusenciaController : ControllerBase {

        private readonly Id4calendariobdContext Context;

        public AusenciaController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ausencium>>> GetAusencias()
        {
            return Ok(await Context.Ausencia
                .Include(p=>p.Comentarios)
                .Include(p=>p.Estado)
                .Include(p=>p.Tipo)
                .ToListAsync());
        }

        [AllowAnonymous]
        [HttpPost("CreateAusencia")]
        public async Task<IActionResult> CreateAusencia()
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };

                Ausencium newausencia = JsonConvert.DeserializeObject<Ausencium>(task.Result);

                if(newausencia == null)
                {
                    return BadRequest();
                }

                //if(newausencia.tipoausencia)


                // newuser.Password=Encriptacao.EncryptPassword(newuser.Password);
                newausencia.Idutilizadorcriador = newausencia.Utilizadorid;//precisa de ser alterado para o user que atualizar
                newausencia.Datacriacao = DateTime.Now;
                newausencia.Idutilizadorultimaedicao = newausencia.Utilizadorid;//precisa de ser alterado para o user que atualizar
                newausencia.Dataultimaedicao = DateTime.Now;

                var existeaprovadores = await Context.Aprovadors.FirstOrDefaultAsync(a => a.Utilizadorid == newausencia.Utilizadorid);
                
                if(existeaprovadores == null)
                {
                    newausencia.Estadoid = 1;
                }
                else
                {
                    newausencia.Estadoid = 3;
                }
                
                Context.Ausencia.Add(newausencia);
                Context.SaveChanges();
                return Ok(200);

            }
            catch (Exception ex)
            {
                return Ok("Error" + ex);
            }

        }

        [HttpGet("GetTeletrabalhos/{id}")]
        public async Task<ActionResult<List<Ausencium>>> GetTeletrabalhos(int id)
        {
            try
            {
                var ausencia = await Context.Ausencia.Where(a => a.Utilizadorid == id  && a.Tipoid==2).ToListAsync();
                if (ausencia == null)
                {
                    return NotFound();
                }

                return Ok(ausencia);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}
