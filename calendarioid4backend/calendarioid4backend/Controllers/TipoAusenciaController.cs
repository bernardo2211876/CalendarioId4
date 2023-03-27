using calendarioid4backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoAusenciaController : ControllerBase
    {

        private readonly Id4calendariobdContext Context;

        public TipoAusenciaController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TipoAusencium>>> GetTipoAusencia()
        {
            return Ok(await Context.TipoAusencia
                .ToListAsync());
        }

    }
}
