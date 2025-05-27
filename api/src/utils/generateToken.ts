import jwt from "jsonwebtoken";

export class GenerateToken {
  private static readonly accessSecret = process.env.ACCESS_TOKEN_SECRET || "accessTokenSecret";
  private static readonly refreshSecret = process.env.REFRESH_TOKEN_SECRET || "refreshTokenSecret";
  private static readonly accessExpires = process.env.ACCESS_EXPIRES || "15m";
  private static readonly refreshExpires = process.env.REFRESH_EXPIRES || "7d";

  static access(userId: string): string {
    return jwt.sign({ userId }, this.accessSecret, { expiresIn: this.accessExpires } as jwt.SignOptions);
  }

  static refresh(userId: string): string {
    return jwt.sign({ userId }, this.refreshSecret, { expiresIn: this.refreshExpires } as jwt.SignOptions);
  }

  static verifyAccess(token: string) {
    return jwt.verify(token, this.accessSecret);
  }

  static verifyRefresh(token: string) {
    return jwt.verify(token, this.refreshSecret);
  }
}
