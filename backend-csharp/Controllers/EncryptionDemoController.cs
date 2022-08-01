using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend_csharp.Controllers;

[ApiController]
[Route("[controller]")]
[EnableCors("All")]

public class EncryptionDemoController : ControllerBase
{
    private readonly RSAEncryptionPadding padding = RSAEncryptionPadding.OaepSHA256;
    private readonly ILogger<EncryptionDemoController> _logger;
    private static byte[] privateKeyPkcs8;

    public EncryptionDemoController(ILogger<EncryptionDemoController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Generate a PrivateKey + PublicKey pair, save the PrivateKey in memory cache and return the PublicKey 
    /// </summary>
    [HttpGet(template: "GenerateNewPublicKey")]
    public string GenerateNewPublicKey()
    {
        //Generate a public/private key pair.  
        using var rsa = RSA.Create();
            
        //keep the private key in the memory cache
        privateKeyPkcs8 = rsa.ExportPkcs8PrivateKey();
        
        //return the public key in X.509 (Base-64) format
        return Convert.ToBase64String(rsa.ExportSubjectPublicKeyInfo());
    }

    [HttpPost(template: "Decrypt")]
    public string Decrypt([FromBody]string encryptedPayloadBase64)
    {
        using var rsa = RSA.Create();
        
        //read private key from the memory cache
        rsa.ImportPkcs8PrivateKey(privateKeyPkcs8, out _);

        //use the private key to decrypt the payload
        var encryptedPayload = Convert.FromBase64String(encryptedPayloadBase64);
        var decryptedPayload = rsa.Decrypt(encryptedPayload, padding);
        var payload = (new UTF8Encoding()).GetString(decryptedPayload);
        return payload;
    }
}
