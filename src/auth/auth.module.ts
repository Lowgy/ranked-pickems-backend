import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { TwitchStrategy } from './utils/twitch-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, TwitchStrategy],
  imports: [PassportModule.register({ defaultStrategy: 'twitch' }), HttpModule],
})
export class AuthModule {}
