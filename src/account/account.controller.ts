import { Body, Controller, Post, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Post('register')
  async register(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    const account = await this.accountsService.create(email, password);
    res.send(`<div>Registration successful for ${account.email}</div>`);
  }
}
