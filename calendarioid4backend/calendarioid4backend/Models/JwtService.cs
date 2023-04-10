using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.Xml;
using System.Text;

namespace calendarioid4backend.Models
{
    public class JwtService
    {
        
        public String SecretKey { get; set; }
        public int TokenDuration { get; set; }
        private readonly IConfiguration Config;
        
        public JwtService(IConfiguration config) { 
            Config= config;
            this.SecretKey = Config.GetSection("jwtConfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(Config.GetSection("jwtConfig").GetSection("Duration").Value);
        }

        public String GenerateToken(String id, String nome,String email,String telemovel)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var payload = new[]
            {
                new Claim("id",id),
                new Claim("nome",nome),
                new Claim("email",email),
                new Claim("telemovel",telemovel)
            };

            var jwtToken = new JwtSecurityToken(
                issuer: Config["Jwt:Issuer"],
                audience: Config["Jwt:Audience"],
                claims: payload,
                expires : DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);

           
        }

        
    }
}
