import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Admin } from './models/admin.model';
import { AdminLoginResponse } from './models/admin-login-response.model';
import { AuthService } from '../modules/auth/auth.service';
import { AdminLoginInput } from './models/admin-login.input';

@Resolver(of => Admin)
export class AdminResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AdminLoginResponse)
  adminLogin(@Args('input') input: AdminLoginInput): Promise<AdminLoginResponse> {
    return this.authService.adminLogin(input);
  }
}
