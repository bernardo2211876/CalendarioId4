using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Nodes;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Threading.Tasks;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corspolicy")]
    public class UtilizadorController : ControllerBase
    {
        private readonly IConfiguration Config;
        private readonly Id4calendariobdContext Context ;
        
        

        

        public UtilizadorController(Id4calendariobdContext context, IConfiguration config)
        {
            Context = context;
            Config = config;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            var utilizadores = await Context.Utilizadors.Include(p=>p.AprovadorUtilizadors).ToListAsync();
            return Ok(utilizadores);
           /*return Ok(await Context.Utilizadors
                .Include(p => p.Ausencia)
                .Include(p => p.AprovadorUtilizadors)
                .Include(p => p.Estado)
                .ToListAsync());*/
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        
        public IActionResult Create()
        {
            try
            {
                Task<string> task = null;
            using (StreamReader reader =  new StreamReader(Request.Body, Encoding.UTF8))
            {
                task = reader.ReadToEndAsync();
            };
             
            Utilizador newuser= JsonConvert.DeserializeObject<Utilizador>(task.Result);
                
            
                if (Context.Utilizadors.Where(u => u.Email == newuser.Email).FirstOrDefault() != null)
                {
                    return Ok(58);
                }

               // newuser.Password=Encriptacao.EncryptPassword(newuser.Password);
                newuser.Idutilizadorcriador = 1;//precisa de ser alterado para o user que atualizar
                newuser.Datacriacao = DateTime.Now;
                newuser.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                newuser.Dataultimaedicao = DateTime.Now;
                newuser.Estadoid = 1;
                Context.Utilizadors.Add(newuser);
                Context.SaveChanges();
                return Ok(200);

            }
            catch (Exception ex)
            {
                return Ok("Error"+ex);
            }
            
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult Login()
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };

                
                    Utilizador user = JsonConvert.DeserializeObject<Utilizador>(task.Result);
                


                
                var userAvailable = Context.Utilizadors.Where(u => u.Email == user.Email && /*Encriptacao.DecryptPassword(*/u.Password == user.Password).FirstOrDefault();
                bool isaprovador = true;
                var aprovador = Context.Aprovadors.Where(a => a.Aprovadorid == userAvailable.Id);
                if(!aprovador.Any())
                {
                     isaprovador = false;
                }
               
                //bool passwordequal = BCrypt.Net.BCrypt.Verify(user.Password, userAvailable.Password);


                if (userAvailable != null)
                {
                    var token = new JwtService(Config).GenerateToken(
                        userAvailable.Id.ToString(),
                        userAvailable.Nome,
                        userAvailable.Email,
                        userAvailable.Telemovel.ToString(),
                        userAvailable.IsAdmin.ToString(),
                        isaprovador.ToString()
                        );
                    Token res = new Token() { token = token };
                    return Ok(res);
                  
                }
                return Ok(400);

            }catch(Exception ex)
            {
                return BadRequest("Error"+ex);
            }
            
        }

       
        [HttpGet("Getuser/{id}")]
        public async Task<ActionResult<List<Utilizador>>> GetUser(int id)
        {
            try
            {
                Utilizador utilizador = await Context.Utilizadors.FirstOrDefaultAsync(u => u.Id == id);
                if (utilizador == null)
                {
                    return NotFound();
                }
                
                return Ok(utilizador);
            }catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("Edituser/{id}")]
        public async Task<IActionResult> EditUser(int id)
        {
            try
            {
                Task<string> task = null;
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    task = reader.ReadToEndAsync();
                };

                Utilizador useredit = JsonConvert.DeserializeObject<Utilizador>(task.Result);

                var user = await Context.Utilizadors.FindAsync(id);

                if(user == null)
                {
                    return NotFound();
                }

                user.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                user.Dataultimaedicao = DateTime.Now;
                user.Nome=useredit.Nome;
                user.Email = useredit.Email;
                user.Nif = useredit.Nif;
                user.Codpostal = useredit.Codpostal;
                user.Morada = useredit.Morada;
                user.Telemovel = useredit.Telemovel;
                user.Funcao = useredit.Funcao;
                
                await Context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("Disableuser/{id}")]
        public async Task<IActionResult> DisableUser(int id)
        {
            try
            {

                var user = await Context.Utilizadors.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                user.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                user.Dataultimaedicao = DateTime.Now;
                user.Estadoid = 2;

                await Context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("Enableuser/{id}")]
        public async Task<IActionResult> EnableUser(int id)
        {
            try
            {

                var user = await Context.Utilizadors.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                user.Idutilizadorultimaedicao = 1;//precisa de ser alterado para o user que atualizar
                user.Dataultimaedicao = DateTime.Now;
                user.Estadoid = 1;

                await Context.SaveChangesAsync();

                return Ok(user);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("Getaprovadores/{id}")]
        public async Task<ActionResult<List<Utilizador>>> GetAprovadores(int id)
        {
            try
            {
                Utilizador utilizador = await Context.Utilizadors.FirstOrDefaultAsync(u => u.Id == id);

                if (utilizador == null)
                {
                    return NotFound();
                }
                var aprovadoresID = await Context.Aprovadors.FirstOrDefaultAsync(a=> a.Utilizadorid == utilizador.Id);

                if (aprovadoresID == null)
                {
                    return Ok(204);
                }
                Utilizador aprovadores = await Context.Utilizadors.FirstOrDefaultAsync(a => a.Id == aprovadoresID.Id);
                

                return Ok(aprovadores);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
       





    }
}
