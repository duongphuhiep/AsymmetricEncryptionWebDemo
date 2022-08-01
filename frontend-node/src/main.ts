import { Buffer } from "buffer";

/** Store */
let publicKey: string;
let encryptedPayloadBase64: string;
const payload = "Some top secret message";

/** Event */

async function generatePublicKey() {
    let publicKeyElement = document.getElementById("publicKey") as HTMLPreElement;
    publicKeyElement.textContent = "Loading";
    let response = await fetch("https://localhost:7059/EncryptionDemo/GenerateNewPublicKey");
    if (!response.ok) {
        publicKeyElement.textContent = "Error " + response.statusText;
        return;
    }
    publicKey = await response.text();
    publicKeyElement.textContent = publicKey;
}
document.getElementById("generatePublicKeyButton")?.addEventListener("click", generatePublicKey);

document.getElementById("payload")!.textContent = payload;

async function encrypt() {
    if (!publicKey) return;

    let cryptoKey = await crypto.subtle.importKey(
        "spki",
        Buffer.from(publicKey, "base64"),
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

    encryptedPayloadBase64 = Buffer.from(encryptedPayload).toString("base64");

    document.getElementById("encryptedPayloadBase64")!.textContent = encryptedPayloadBase64;
}
document.getElementById("encryptButton")?.addEventListener("click", encrypt);

async function decrypt() {
    let decryptedPayloadElement = document.getElementById("decryptedPayload") as HTMLPreElement;
    let response = await fetch("https://localhost:7059/EncryptionDemo/Decrypt", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        referrerPolicy: "no-referrer",
        body: '"' + encryptedPayloadBase64 + '"'
    });
    if (!response.ok) {
        decryptedPayloadElement!.textContent = "Error " + response.statusText;
        return;
    }
    decryptedPayloadElement!.textContent = await response.text();
}
document.getElementById("decryptButton")?.addEventListener("click", decrypt);

/**
 * Bootstrap
 */
async function bootstrap() {
    await generatePublicKey();
    await encrypt();
    await decrypt();
}

bootstrap();

export default {}
