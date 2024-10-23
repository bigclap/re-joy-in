import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    // Проверяем наличие JWT в cookies
    const jwt = req.cookies['jwt'];

    if (!jwt) {
      // Если токена нет — делаем редирект на страницу логина
      res.redirect('/account/login');
      return false;
    }

    return true;
  }
}
