import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EvaluationModule } from './modules/evaluation/evaluation.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}), EvaluationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
