import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '../modules/user/models/customer.model';
import { UseGuards } from '@nestjs/common';
import { GqlCurUser } from '../modules/auth/gql-cur-user.param.decorator';
import { Admin } from '../modules/user/models/admin.model';
import { AdminLoginResponse } from '../modules/user/models/admin-login-response.model';
import { AuthService } from '../modules/auth/auth.service';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { AdminLoginInput } from '../modules/auth/dto/admin-login.input';

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
