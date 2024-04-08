import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitch')
  @UseGuards(AuthGuard('twitch'))
  async twitchLogin() {
    return 'Twitch login';
  }

  @Get('twitch/callback')
  async twitchLoginCallback(@Req() req, @Res() res) {
    const code = req.query.code;
    const tokenResponse = await this.authService.exchangeCodeForToken(code);
    const twitchDetails = await this.authService.getUserDetails(
      tokenResponse.data.access_token,
    );
    const userDetails = {
      username: twitchDetails.data.data[0].display_name,
      accessToken: tokenResponse.data.access_token,
      refreshToken: tokenResponse.data.refresh_token,
      refreshTokenExpiry: tokenResponse.data.expires_in,
    };
    const user = await this.authService.validateUser(userDetails);
    console.log('User: ', user);
    res.redirect('http://localhost:3001');
  }
}
