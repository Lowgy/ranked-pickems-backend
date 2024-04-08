import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PickModule } from './pick/pick.module';
import { ParticipantModule } from './participant/participant.module';
import { MatchModule } from './match/match.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PickModule,
    ParticipantModule,
    MatchModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
