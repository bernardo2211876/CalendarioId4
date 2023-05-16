using calendarioid4backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
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

        [HttpGet("GetAusencia/{id}")]
        public async Task<ActionResult<List<Ausencium>>> GetAusencia(int id)
        {
            try
            {
                var ausencia = await Context.Ausencia.Where(u => u.Id == id)
                                           .Join(Context.Utilizadors,
                                                ausencia => ausencia.Utilizadorid,
                                                user => user.Id,
                                                (ausencia, user) => new {
                                                    Ausencia = ausencia,
                                                    NomeUtilizador = user.Nome
                                                })
                                           .Join(Context.Utilizadors,
                                                ausencia => ausencia.Ausencia.Idutilizadorultimaedicao,
                                                user => user.Id,
                                                (ausencia, user) => new {
                                                    Ausencia = ausencia.Ausencia, // Include Ausencia from previous join
                                                    NomeUtilizador = ausencia.NomeUtilizador, // Include NomeUtilizador from previous join
                                                    NomeUtilizadorEdicao = user.Nome
                                                })
                                                .ToListAsync();
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


        //-----------------------------------------------------------------------------------------------------

        [HttpGet("GetAusencias/{id}")]
        public async Task<ActionResult<List<Ausencium>>> GetAusencias(int id)
        {
            try
            {
                var ausencia = await Context.Ausencia.Where(a => a.Utilizadorid == id && a.Tipoid == 3).ToListAsync();
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

        //-----------------------------------------------------------------------------------------------------




        [AllowAnonymous]
        [HttpPost("getAusenciasPendentes/{id}")]
        public async Task<ActionResult> getAusenciasPendentes( int id)
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };


                Ausencium ausenciatipo = JsonConvert.DeserializeObject<Ausencium>(task.Result);


                var users = Context.Aprovadors.Where(a=>a.Aprovadorid==id);
                var userIds = users.Select(u => u.Utilizadorid).ToList();
                
                var ausenciaspendentes = await Context.Ausencia
                                            .Where(au => userIds.Contains(au.Utilizadorid) && au.Tipoid == ausenciatipo.Tipoid && au.Estadoid == 3)
                                            .Join(Context.Utilizadors,
                                                ausencia => ausencia.Utilizadorid,
                                                user => user.Id,
                                                (ausencia, user) => new {
                                                    Ausencia = ausencia,
                                                    Nome = user.Nome
                                                })
                                            .ToListAsync();

                return Ok(ausenciaspendentes);

            }
            catch (Exception ex)
            {
                return BadRequest("Error" + ex);
            }

        }



        [HttpPut("Disableausencia/{id}")]
        public async Task<IActionResult> Disableausencia(int id)
        {
            try
            {

                var ausencia = await Context.Ausencia.FindAsync(id);

                if (ausencia == null)
                {
                    return NotFound();
                }

                ausencia.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                ausencia.Dataultimaedicao = DateTime.Now;
                ausencia.Estadoid = 2;

                await Context.SaveChangesAsync();

                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("acceptAusencia/{id}")]
        public async Task<IActionResult> acceptAusencia(int id)
        {
            try
            {

                var ausencia = await Context.Ausencia.FindAsync(id);

                if (ausencia == null)
                {
                    return NotFound();
                }

                ausencia.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                ausencia.Dataultimaedicao = DateTime.Now;
                ausencia.Estadoid = 1;

                await Context.SaveChangesAsync();

                return Ok(ausencia);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }



    }
}
