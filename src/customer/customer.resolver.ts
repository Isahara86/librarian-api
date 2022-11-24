import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from './models/customer.model';

@Resolver(of => Customer)
export class CustomerResolver {
  @Query(returns => [Customer])
  async customers(): Promise<Customer[]> {
    return [
      { id: 11, email: 'test@test.com', name: 'Eren' },
      { id: 12, email: 'test2@test.com', name: 'Lila' },
    ];
  }
}
