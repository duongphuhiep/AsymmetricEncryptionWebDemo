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

--
TODO: Dockerfile, docker-compose