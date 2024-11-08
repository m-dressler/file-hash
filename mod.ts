import { crypto } from "@std/crypto";

/** All the valid algorithms that can bes used to hash a function */
export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/**
 * @param path The path to the file
 * @param algorithm The algorithm to use (default "SHA-256")
 * @returns A Uint8Array containing the file content's hash
 */
export default async function getFileHash(
  path: string,
  algorithm: HashAlgorithm = "SHA-256"
): Promise<ArrayBuffer> {
  const file = await Deno.open(path, { read: true });
  const hash = await crypto.subtle.digest(algorithm, file.readable);
  file.close();
  return hash;
}
