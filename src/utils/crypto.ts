import { createCipheriv, createDecipheriv, scryptSync } from "crypto";

export interface EncryptionConfig {
    algorithm: string;
    key: string | Buffer;
    iv: string | Buffer;
  }

const UTF8_ENCODING = "utf8";
const HEX_ENCODING = "hex";

export const encrypt = (encryptionConfig: EncryptionConfig, text: string) => {
  const { algorithm, key, iv } = encryptionConfig;
  const cipher = createCipheriv(algorithm, key, iv);
  let crypted = cipher.update(text, UTF8_ENCODING, HEX_ENCODING);
  crypted += cipher.final(HEX_ENCODING);
  return crypted;
};

export const serializeEncrypt = (
  encryptionConfig: EncryptionConfig,
  object: object
) => {
  return encrypt(encryptionConfig, JSON.stringify(object));
};

export const decrypt = (encryptionConfig: EncryptionConfig, text: string) => {
  const { algorithm, key, iv } = encryptionConfig;
  const decipher = createDecipheriv(algorithm, key, iv);
  let dec = decipher.update(text, HEX_ENCODING, UTF8_ENCODING);
  dec += decipher.final(UTF8_ENCODING);
  return dec;
};

export const serializeDecrypt = (
  encryptionConfig: EncryptionConfig,
  text: string
) => {
  return JSON.parse(decrypt(encryptionConfig, text));
};

export const getEncryptionConfig = (key: string): EncryptionConfig  => {
    return {
      algorithm: "aes-192-cbc",
      key: scryptSync(key, "salt", 24),
      iv: Buffer.alloc(16, 0),
    };
  }