import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.REACT_APP_KEY, "hex");

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encryptedData = iv.toString("hex") + encrypted.toString("hex");
  return encryptedData;
};

const decrypt = (data) => {
  const text = {
    iv: data.substring(0, 32),
    encryptedData: data.substring(32),
  };
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const krypton = {
  encrypt: encrypt,
  decrypt: decrypt,
};

export default krypton;
