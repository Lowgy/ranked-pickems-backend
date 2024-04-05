import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PickModule } from './pick/pick.module';

@Module({
  imports: [UserModule, AuthModule, PickModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
