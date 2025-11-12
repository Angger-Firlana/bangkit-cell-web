import { useEffect, useState } from "react";
import { getDecrypted } from "../../shared/utils/EncryptedLocal";
import { getProfile } from "../../services/authService";

interface User {
  id: number;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getDecrypted("token");

    if (!token) {
      setLoading(false);
      return; // belum login
    }

    // kalau token ada, ambil profil dari backend
    getProfile()
      .then((res) => {
        setUser(res.data || res); // tergantung struktur response
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
