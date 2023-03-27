using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoAusenciaController : ControllerBase
    {

        private readonly Id4calendariobdContext Context;

        public EstadoAusenciaController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<EstadoAusencium>>> GetEstadoAusencia()
        {
            return Ok(await Context.EstadoAusencia
                .ToListAsync());
        }
    }
}
