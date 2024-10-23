import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    // this.accountsRepository.delete({ email: 'pamsj62@gmail.com' });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ account: AccountEntity; jwt: string }> {
    const account = await this.accountsRepository.findOne({ where: { email } });
    if (!account) {
      throw new HttpException('email not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await compare(password, account.password);
    if (!isPasswordValid) {
      throw new HttpException('password wrong', HttpStatus.BAD_REQUEST);
    }

    return { account, jwt: this.jwtService.sign({ id: account.id }) };
  }

  async create(email: string, password: string): Promise<AccountEntity> {
    const account = await this.accountsRepository.findOne({ where: { email } });
    if (account) {
      throw new HttpException('email already registered', HttpStatus.CONFLICT);
    }
    // Хэшируем пароль
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    const newAccount = this.accountsRepository.create({
      email,
      password: hashedPassword,
    });
    return this.accountsRepository.save(newAccount);
  }
}
