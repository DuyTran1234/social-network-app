import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from "dotenv";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
