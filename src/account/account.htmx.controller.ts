import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';

@Controller('account')
export class AccountHtmxController {
  constructor(private readonly accountsService: AccountService) {}

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
      const account = await this.accountsService.create(email, password);
      res.send(`<div>Registration successful for ${account.email}</div>`);
    } catch (e) {
      res.send(`<div>${e.message}</div>`);
    }
  }
}
