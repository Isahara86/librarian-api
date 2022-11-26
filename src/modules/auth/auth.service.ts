import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerService } from '../user/customer.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_ADMIN_SECRET } from '../../environment';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { AdminLoginInput } from '../../api/inputs/admin-login.input';
import { AdminService } from '../user/admin.service';
import * as bcrypt from 'bcrypt';
import { AdminLoginResponse } from '../../api/models/admin-login-response.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async adminLogin({ login, password }: AdminLoginInput): Promise<AdminLoginResponse> {
    console.log({ login, password });
    const admin = await this.adminService.findByLogin(login);

    if (!admin) {
      throw new NotFoundException('Login and password combination not found');
    }

    await this.validatePassword({
      password,
      passwordHash: admin.password,
      salt: admin.passwordSalt,
    });

    const payload: JwtPayloadDto = { name: admin.name, sub: admin.id };
    return {
      name: admin.name,
      token: await this.jwtService.signAsync(payload, {
        secret: JWT_ADMIN_SECRET,
      }),
    };
  }

  private async validatePassword({
    passwordHash,
    password,
    salt,
  }: {
    passwordHash: string;
    password: string;
    salt: string;
  }): Promise<void> {
    const hash = await bcrypt.hash(password, salt);
    const isValid = passwordHash === hash;

    if (!isValid) {
      throw new NotFoundException('Login and password combination not found');
    }
  }

  async registerAdmin({
    login,
    password,
    name,
  }: {
    login: string;
    password: string;
    name: string;
  }): Promise<void> {
    const admin = await this.adminService.findByLogin(login);
    if (admin) {
      throw new BadRequestException(`${login} is already exist`);
    }

    const adminPasswordSalt = await bcrypt.genSalt(10);

    // TODO add user id to password to prevent password swap
    const hash = await bcrypt.hash(password, adminPasswordSalt);

    await this.adminService.create({
      login,
      password: hash,
      name,
      passwordSalt: adminPasswordSalt,
    });
  }
}
