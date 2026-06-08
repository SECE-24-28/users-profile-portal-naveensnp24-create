import jwt from "jsonwebtoken";

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}