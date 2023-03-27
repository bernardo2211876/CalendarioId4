using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoUtilizadorController : ControllerBase
    {
        private readonly Id4calendariobdContext Context;

        public EstadoUtilizadorController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<EstadoUtilizador>>> GetEstadosUtilizador()
        {
            return Ok(await Context.EstadoUtilizadors
                .ToListAsync());
        }
    }
}
