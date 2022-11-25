import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '../modules/user/models/customer.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../modules/auth/gql-auth.guard';
import { GqlCurUser } from '../modules/auth/gql-cur-user.param.decorator';

@Resolver(of => Customer)
export class CustomerResolver {
  @Query(returns => Customer)
  @UseGuards(GqlAuthGuard)
  whoAmI(@GqlCurUser() user: any) {
    console.log(user);
    return { id: 114, ...user };
  }

  @Query(returns => [Customer])
  async customers(): Promise<Customer[]> {
    return [
      { id: 11, email: 'test@test.com', name: 'Eren' },
      { id: 12, email: 'test2@test.com', name: 'Lila' },
    ];
  }
}
