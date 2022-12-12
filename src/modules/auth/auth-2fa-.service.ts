import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

import { TWO_FACTOR_AUTHENTICATION_APP_NAME } from '../../environment';

@Injectable()
export class TwoFactorAuthService {
  constructor() {
    this.generateTwoFactorAuthSecret().then(res => console.log(JSON.stringify(res)));
    this.f2aValidate().then(res => console.log(res));
  }

  config = {
    secret: 'K4BG4AD7AB5DAMJW',
    otpAuthUrl:
      'otpauth://totp/gummersbach-library:1123?secret=K4BG4AD7AB5DAMJW&period=30&digits=6&algorithm=SHA1&issuer=gummersbach-library',
  };

  public async generateTwoFactorAuthSecret() {
    // const auth = await this.userRepository.getUserInfoByUsername(user.username);
    // if (auth) {
    //   if (auth.isTwoFactorEnable) {
    //     return {
    //       msg: 'Already QR generated',
    //     };
    //   }
    // }

    const userId = 1123;

    const secret = authenticator.generateSecret();

    const otpAuthUrl = authenticator.keyuri(
      userId.toString(),
      TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );

    return {
      secret,
      otpAuthUrl,
    };
  }

  public async f2aValidate() {
    return authenticator.verify({
      token: '004456',
      secret: this.config.secret,
    });
  }

  // public async activationOfTwoFa(email: string, status: boolean) {
  //   return await this.userRepository.update(
  //     { username: email },
  //     {
  //       isTwoFactorEnable: status,
  //     },
  //   );
  // }

  // public async verifyTwoFaCode(code: string, user: User) {
  //   return authenticator.verify({
  //     token: code,
  //     secret: user.twoFactorAuthSecret,
  //   });
  // }
  //
  // async signIn(
  //   user: User,
  //   isTwoFaAuthenticated: boolean,
  // ): Promise<{ accessToken: string; refreshToken: string; user: JwtPayload }> {
  //   const data = {
  //     isTwoFaAuthenticated,
  //     isTwoFactorEnable: user.isTwoFactorEnable,
  //     username: user.username,
  //     user_info: user.user_info,
  //   };
  //   const accessToken = await this.authService.getAccessToken(data);
  //   const refreshToken = await this.authService.getRefreshToken(data);
  //
  //   await this.authService.updateRefreshTokenInUser(refreshToken, user.username);
  //
  //   return {
  //     accessToken,
  //     refreshToken,
  //     user: {
  //       username: user.username,
  //       user_info: user.user_info,
  //     },
  //   };
  // }
}

// async generateQrCode(
//   @Res() response: Response, @GetUser() user: User
// ) {
//   const { otpAuthUrl } = await this.twoFactorAuthService.generateTwoFactorAuthSecret(user);
//   response.setHeader('content-type','image/png');
//   return this.twoFactorAuthService.qrCodeStreamPipe(response, otpAuthUrl);
// }
