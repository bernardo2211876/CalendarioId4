﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

    }
}
