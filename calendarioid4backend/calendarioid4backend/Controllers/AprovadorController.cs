using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AprovadorController : ControllerBase
    {
        private readonly Id4calendariobdContext Context;

        public AprovadorController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Aprovador>>> GetAprovadores()
        {
            return Ok(await Context.Aprovadors
                .ToListAsync());
        }

        [AllowAnonymous]
        [HttpPost("AdicionarAprovacao")]
        public IActionResult AdicionarAprovacao()
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };

                Aprovador newaprovador = JsonConvert.DeserializeObject<Aprovador>(task.Result);

                // newuser.Password=Encriptacao.EncryptPassword(newuser.Password);
                newaprovador.Idutilizadorcriador = 1;//precisa de ser alterado para o user que atualizar
                newaprovador.Datacriacao = DateTime.Now;
                newaprovador.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                newaprovador.Dataultimaedicao = DateTime.Now;
                Context.Aprovadors.Add(newaprovador);
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