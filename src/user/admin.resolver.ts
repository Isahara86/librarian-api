import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { GqlCurUser } from '../auth/gql-cur-user.param.decorator';
import { Admin } from './models/admin.model';

@Resolver(of => Admin)
export class AdminResolver {
  @Query(returns => Customer)
  @UseGuards(GqlAuthGuard)
  whoAmIAdmin(@GqlCurUser() user: any) {
    console.log(user);
    return { id: 114, ...user };
  }
}
