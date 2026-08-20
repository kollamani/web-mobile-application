import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey123',
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Explicitly convert sub/id to a string so Mongoose gets a valid 24-character hex string
    const rawId = payload.sub || payload.userId || payload._id || payload.id;
    const userIdString = typeof rawId === 'function' ? String(rawId) : String(rawId);

    return {
      userId: userIdString,
      _id: userIdString,
      email: payload.email,
    };
  }
}