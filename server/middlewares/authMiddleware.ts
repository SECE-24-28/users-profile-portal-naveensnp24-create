import { verifyToken } from "../utils/jwt";

export function getUserFromToken(req: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}