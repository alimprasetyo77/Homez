import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export class Token {
  private static readonly accessSecret = process.env.ACCESS_TOKEN_SECRET || "accessTokenSecret";
  private static readonly refreshSecret = process.env.REFRESH_TOKEN_SECRET || "refreshTokenSecret";
  private static readonly accessExpires = process.env.ACCESS_EXPIRES || "15m";
  private static readonly refreshExpires = process.env.REFRESH_EXPIRES || "7d";

  static generateAccess(userId: string): string {
    return jwt.sign({ userId }, this.accessSecret, {
      expiresIn: this.accessExpires,
    } as SignOptions);
  }

  static generateRefresh(userId: string): string {
    return jwt.sign({ userId }, this.refreshSecret, {
      expiresIn: this.refreshExpires,
    } as SignOptions);
  }

  static verifyAccess(token: string): JwtPayload & { userId: string } {
    return jwt.verify(token, this.accessSecret) as JwtPayload & { userId: string };
  }

  static verifyRefresh(token: string): JwtPayload & { userId: string } {
    return jwt.verify(token, this.refreshSecret) as JwtPayload & { userId: string };
  }
}
