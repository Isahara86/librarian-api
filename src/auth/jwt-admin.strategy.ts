import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JWT_ADMIN_SECRET } from '../environment';
import { ContextAdminDto } from './dto/context-admin.dto';
import { AdminService } from '../user/admin.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_ADMIN_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<ContextAdminDto | null> {
    const admin = await this.adminService.findById(payload.sub);
    if (!admin) {
      return null;
    }

    return { adminId: admin.id, adminName: admin.name };
  }
}
