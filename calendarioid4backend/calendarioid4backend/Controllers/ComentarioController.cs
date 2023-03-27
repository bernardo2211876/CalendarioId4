using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace calendarioid4backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    

    public class ComentarioController : ControllerBase
    {

        private readonly Id4calendariobdContext Context;

        public ComentarioController(Id4calendariobdContext context)
        {
            Context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Comentario>>> GetComentario()
        {
            return Ok(await Context.Comentarios
                .ToListAsync());
        }

    }
}
