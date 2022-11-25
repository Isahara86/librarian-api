import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { UseGuards } from '@nestjs/common';
import { GqlCurUser } from '../auth/gql-cur-user.param.decorator';
import { Admin } from './models/admin.model';
import { AdminLoginResponse } from './models/admin-login-response.model';
import { AuthService } from '../auth/auth.service';
import { GqlAdminAuthGuard } from '../auth/gql-admin-auth.guard';
import { AdminLoginInput } from '../auth/dto/admin-login.input';

@Resolver(of => Admin)
export class AdminResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => Customer)
  @UseGuards(GqlAdminAuthGuard)
  whoAmIAdmin(@GqlCurUser() user: any): Promise<Customer> {
    console.log(user);
    return { id: 114, ...user };
  }

  @Mutation(returns => AdminLoginResponse)
  adminLogin(
    @Args('input')
    input: AdminLoginInput,
  ): Promise<AdminLoginResponse> {
    return this.authService.adminLogin(input);
  }
}
