using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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




    }
}
