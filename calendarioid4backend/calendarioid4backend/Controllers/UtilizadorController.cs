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

   

        [HttpGet]
        public async Task<ActionResult<List<Utilizador>>> GetUsers()
        {
            return Ok(await Context.Utilizadors
                .Include(p => p.Ausencia)
                .Include(p => p.AprovadorUtilizadors)
                .Include(p => p.Estado)
                .ToListAsync());
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

                //newuser.Password=Encodepassword(newuser.Password);
                newuser.Idutilizadorcriador = 1;
                newuser.Datacriacao = DateTime.Now;
                newuser.Idutilizadorultimaedicao = 1;
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


                
                var userAvailable = Context.Utilizadors.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefault();
                //bool passwordequal = BCrypt.Net.BCrypt.Verify(user.Password, userAvailable.Password);


                if (userAvailable != null)
                {
                    /* return Ok(new JwtService(Config).GenerateToken(
                         user.Id.ToString(),
                         user.Nome,
                         user.Email,
                         user.Telemovel.ToString()
                         ));*/
                    return Ok(200);
                }
                return Ok(400);

            }catch(Exception ex)
            {
                return Ok("Error"+ex);
            }
            
        }

     /*public String Encodepassword(String password)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }*/

     



    }
}
