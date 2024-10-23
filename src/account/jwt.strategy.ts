import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Извлекаем JWT токен из куки 'jwt'
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['jwt']; // Название куки, где хранится JWT токен
          }
          return token;
        },
      ]), // Извлекаем JWT токен из заголовка Authorization
      ignoreExpiration: false, // Игнорировать истекший токен (false = не игнорировать)
      secretOrKey: 'your-secret-key', // Секретный ключ для верификации токена
    });
  }

  async validate(payload: any) {
    // Данные, которые будут доступны при успешной проверке токена
    return { ...payload };
  }
}
