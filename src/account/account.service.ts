import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
  ) {}

  async create(email: string, password: string): Promise<AccountEntity> {
    const newAccount = this.accountsRepository.create({ email, password });
    return this.accountsRepository.save(newAccount);
  }
}
