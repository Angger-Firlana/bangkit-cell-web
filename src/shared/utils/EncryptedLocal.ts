import CryptoJS from "crypto-js";

// Kunci rahasia (jangan di-hardcode di production)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Simpan data terenkripsi
export const saveEncrypted = (key: string, value: string) => {
  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  localStorage.setItem(key, encrypted);
};

// Ambil data dan dekripsi
export const getDecrypted = (key: string): string | null => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted || null;
};

// Hapus data
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
