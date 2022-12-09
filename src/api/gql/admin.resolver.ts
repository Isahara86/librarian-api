import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Admin } from './models/admin.model';
import { AdminLoginResponse } from './models/admin-login-response.model';
import { AuthService } from '../../modules/auth/auth.service';
import { AdminLoginInput } from './inputs/admin-login.input';
import { AdminInviteInput } from './inputs/admin-invite.input';
import { SuccessModel } from './models/success.model';
import { BadRequestException } from '@nestjs/common';

@Resolver(of => Admin)
export class AdminResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AdminLoginResponse)
  adminLogin(@Args('input') input: AdminLoginInput): Promise<AdminLoginResponse> {
    return this.authService.adminLogin(input);
  }

  @Mutation(returns => SuccessModel)
  async inviteAdmin(@Args('input') input: AdminInviteInput): Promise<SuccessModel> {
    await this.authService.registerAdmin(input);
    return { success: true };
  }
}
