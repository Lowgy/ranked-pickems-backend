import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
  ) {}
  async validateUser(profile: any): Promise<any> {
    const user = await this.userService.findOrCreate(profile);
    return user;
  }

  async exchangeCodeForToken(code: string): Promise<any> {
    try {
      const response = await this.httpService
        .post(
          'https://id.twitch.tv/oauth2/token',
          {
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/auth/twitch/callback',
          },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .toPromise();
      return response;
    } catch (error) {
      console.error('Error exchanging code: ', error.message);
      throw error;
    }
  }

  async getUserDetails(accessToken: string): Promise<any> {
    try {
      const response = await this.httpService
        .get('https://api.twitch.tv/helix/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
          },
        })
        .toPromise();
      return response;
    } catch (error) {}
  }
}
