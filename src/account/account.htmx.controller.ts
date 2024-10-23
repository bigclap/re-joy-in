import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';

@Controller('account')
export class AccountHtmxController {
  constructor(private readonly accountsService: AccountService) {}

  @Get('login')
  async renderLogin(@Res() res: Response) {
    res.render('account/login', { title: 'Login' });
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const { jwt } = await this.accountsService.login(email, password);
      res.render('components/notification', {
        message: jwt,
        layout: false,
      });
    } catch (e) {
      res.render('components/notification', {
        message: e.message,
        layout: false,
      });
    }
  }

  @Get('registration')
  async renderRegistration(@Res() res: Response) {
    res.render('account/registration', { title: 'Registration' });
  }

  @Post('registration')
  async registration(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      await this.accountsService.create(email, password);
      const { jwt } = await this.accountsService.login(email, password);
      res.send({ jwt });
    } catch (e) {
      res.render('components/notification', {
        message: e.message,
        layout: false,
      });
      res.status(e.status || 500);
    }
  }
}
