import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'rejoyin.db',
      synchronize: true, // Только для разработки
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
}
