import { Strategy } from 'passport-twitch-new';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitch/callback',
      scope: ['user:read:email'],
    });
  }
}
