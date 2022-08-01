This Backend C# API provides 2 function
- Generate a PublicKey + (Save the PrivateKey in memory)
- Decrypt a payload using the saved PrivateKey

This is only for Demontration purpose so this Backend Server can serve only 1 client.
It means that if you open 2 browser then the cached PrivateKey is replaced and can only serve the last client.

If you want to do more Asymmetric Encryption in C# then [this codes snippet](https://github.com/duongphuhiep/ToolsPack.NetCore/blob/master/Tests/ToolsPack.String.Tests/RsaEncryptionTest.cs) demonstrates How to:
* Generate a pair of public key and private key
* Save the public key to a text file (public.pem)
* Save the private key to a binary file (private.pkcs8)
* Save the private key to a text file (private.pem)
* Read the public key from the public.pem file and use it to encrypt a payload
* Read the private key from the private.pem file and use it to decrypt the payload
* Read the private key from the private.pkcs8 file and use it to decrypt the payload

It should be enough for most use cases. For example: this backend API used a portion of the code snippet.

