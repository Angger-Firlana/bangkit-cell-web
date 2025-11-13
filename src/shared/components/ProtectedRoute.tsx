import { Navigate } from "react-router-dom";
import { getDecrypted } from "../utils/EncryptedLocal"; // sesuaikan path-nya ya
import type { User } from "../../types";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getDecrypted("token");

  console.log(token); 
  // ⛔ kalau token kosong langsung redirect, tanpa loading
  if (!token) {
    return <Navigate to="/bangkit-cell/forbidden-access" replace />;
  }
  // ✅ kalau ada token, langsung render halaman
  return children;
}
