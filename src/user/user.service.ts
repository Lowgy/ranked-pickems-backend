import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(profile: any): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username: profile.username },
    });

    if (user) {
      return user;
    } else {
      console.log('Creating new user');
      const newUser = await this.prisma.user.create({
        data: {
          username: profile.username,
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          refreshTokenExpiry: profile.refreshTokenExpiry,
        },
      });
      return newUser;
    }
  }
}
