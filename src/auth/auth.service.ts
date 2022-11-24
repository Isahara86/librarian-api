import { Injectable } from '@nestjs/common';
import { CustomerService } from '../user/customer.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_ADMIN_SECRET } from '../environment';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private jwtService: JwtService,
  ) {
    this.customerLogin({ username: 'User 113', userId: 113 }).then(res =>
      console.log(res),
    );
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  async customerLogin(user: any): Promise<{ token: string }> {
    const payload: JwtPayloadDto = { name: user.name, sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  // async adminLogin(user: any): Promise<{ token: string }> {
  //   await this.validateOtp({ phone, otp });
  //
  //   const admin = await this.identityAdminService.findAdmin({ phone });
  //   await this.identityAdminService.updateOtp({
  //     userId: admin.id,
  //     otp: null,
  //     otpExpiresAt: null,
  //   });
  //
  //   const payload: JwtPayloadDto = { name: admin.name, sub: admin.id };
  //   return {
  //     token: await this.jwtService.signAsync(payload, {
  //       secret: JWT_ADMIN_SECRET,
  //     }),
  //   };
  // }

}
