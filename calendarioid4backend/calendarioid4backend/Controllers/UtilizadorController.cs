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

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("corspolicy")]
    public class UtilizadorController : ControllerBase
    {
        private readonly IConfiguration Config;
        private readonly Id4calendariobdContext Context ;
        

        

        public UtilizadorController(Id4calendariobdContext context)
        {
            Context = context;
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
                
            
                /*if (Context.Utilizadors.Where(u => u.Email == newuser.Email).FirstOrDefault() != null)
                {
                    return Ok("Already Exist");
                }*/

                newuser.Idutilizadorcriador = 1;
                newuser.Datacriacao = DateTime.Now;
                newuser.Idutilizadorultimaedicao = 1;
                newuser.Dataultimaedicao = DateTime.Now;
                newuser.Estadoid = 1;
                Context.Utilizadors.Add(newuser);
                Context.SaveChanges();
                return Ok("Success");

            }
            catch (Exception ex)
            {
                return Ok("Error"+ex);
            }
            
        }

        [HttpPost("LoginUser")]
        public IActionResult Login(Login user)
        {
            var userAvailable = Context.Utilizadors.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefault();
            if(userAvailable != null)
            {
                return Ok("Sucess");
            } 
            return Ok("Failure");
        }


       
    }
}
