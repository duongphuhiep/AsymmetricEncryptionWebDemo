This is a demo for Asymmetric Encryption

* The backend API in C# know how to
  * Generate a pair of PublicKey + PrivateKey
  * Decrypt some encrypted payload coming from the frontend application with the PrivateKey

* The frontend in Vanilla javascript (Typescript) knows How to
  * Ask the backend C# for a PublicKey
  * encrypt a message using the PublicKey
  * Ask the backend C# to decrypt the payload

To simplify the demonstration purpose, the backend API serve only 1 client.

![Sample](https://user-images.githubusercontent.com/1638594/182097601-b3262f01-9ae9-4a15-9ad5-9739801f03db.png)

# Quick codes gist

(In case you are lazy to navigate the codes)

Step 1) Generate PublicKey + PrivateKey (C#)

```C#
using var rsa = RSA.Create();
byte[] privateKeyPkcs8 = rsa.ExportPkcs8PrivateKey();
byte[] publicKey = rsa.ExportSubjectPublicKeyInfo();

//you can convert these key to text string if you want
string publicKeyBase64Encoded = Convert.ToBase64String(publicKey);
```

Step 2) Encrypt a payload (Typescript / Javascript)

```ts
import { Buffer } from "buffer";

const payload = "Some top secret message";

let cryptoKey = await crypto.subtle.importKey(
    "spki",
    Buffer.from(publicKeyBase64Encoded, "base64"),
    { name: "RSA-OAEP", hash: { name: "SHA-256" } },
    false,
    ["encrypt"]
);

let encryptedPayload: ArrayBuffer = await crypto.subtle.encrypt(
    {
        name: "RSA-OAEP"
    },
    cryptoKey,
    Buffer.from(payload, "utf8")
);

encryptedPayloadBase64Encoded = Buffer.from(encryptedPayload).toString("base64");
```

Step 3) Decrypt the payload (C#)

```C#
using var rsa = RSA.Create();

//set the Private Key (generated from the step 1)
rsa.ImportPkcs8PrivateKey(privateKeyPkcs8, out _);

var encryptedPayload = Convert.FromBase64String(encryptedPayloadBase64Encoded);
var decryptedPayload = rsa.Decrypt(encryptedPayload, RSAEncryptionPadding.OaepSHA256);
var payload = (new UTF8Encoding()).GetString(decryptedPayload); //"Some top secret message"
```

--

TODO: Dockerfile, docker-compose