// @ts-ignore
import IPFS from "ipfs";
import * as openpgp from "openpgp";

export const getFile = async (cid: string): Promise<Buffer> => {
  const node = await IPFS.create();

  const stream = node.cat(cid, {
    timeout: 120000,
  });
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buf = Buffer.concat(chunks);
  node.stop();

  return buf;
};

export const unlockKey = async (privKey: string, passphrase: string): Promise<openpgp.key.Key> => {
  const {
    keys: [privKeyOpen],
  } = await openpgp.key.readArmored(privKey);
  await privKeyOpen.decrypt(passphrase);

  return privKeyOpen;
};

export const decryptFile = async (file: Buffer, unlockedKey: openpgp.key.Key) => {
  const { data: decrypted } = await openpgp.decrypt({
    message: await openpgp.message.readArmored(file),
    privateKeys: [unlockedKey],
    format: "binary",
  });

  return Buffer.from(decrypted);
};

export const downloadBlob = (data: Buffer, filename: string, mime: string) => {
  const blob = new Blob([data], { type: mime });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename || "download";

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };

  a.addEventListener("click", clickHandler, false);

  a.click();

  return a;
};
