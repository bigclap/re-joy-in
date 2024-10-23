import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем JWT токен из заголовка Authorization
      ignoreExpiration: false,  // Игнорировать истекший токен (false = не игнорировать)
      secretOrKey: 'your-secret-key',  // Секретный ключ для верификации токена
    });
  }

  async validate(payload: any) {
    // Данные, которые будут доступны при успешной проверке токена
    return { userId: payload.sub, username: payload.username };
  }
}
