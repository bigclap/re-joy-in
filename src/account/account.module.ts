import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { AccountHtmxController } from './account.htmx.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.register({
      secret: 'your-secret-key', // Секретный ключ для подписи JWT
      signOptions: { expiresIn: '1h' }, // Время жизни токена
    }),
  ],
  providers: [AccountService],
  controllers: [AccountHtmxController],
})
export class AccountModule {}
