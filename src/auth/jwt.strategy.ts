import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../environment';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ContextCustomerDto } from './dto/context-customer.dto';
import { CustomerService } from '../user/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly customerService: CustomerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<ContextCustomerDto | null> {
    const customer = await this.customerService.findById(payload.sub);
    if (!customer) {
      return null;
    }

    return { id: customer.id, name: customer.name };
  }
}
