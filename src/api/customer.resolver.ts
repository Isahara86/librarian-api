import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { UseGuards } from '@nestjs/common';
import { CustomerCreateInput } from './models/customer-create.input';
import { CustomerService } from '../modules/user/customer.service';
import { CustomerUpdateInput } from './models/customer-update.input';
import { CustomersSearchInput } from './models/customers-search.input';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { CustomerDetails } from './models/customer-details.model';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(returns => [CustomerDetails])
  @UseGuards(GqlAdminAuthGuard)
  async customerDetails(@Args('id', { type: () => Int }) id: number): Promise<CustomerDetails> {
    return this.customerService.getCustomerDetails(id);
  }

  @Query(returns => [Customer])
  @UseGuards(GqlAdminAuthGuard)
  async customers(@Args('input') input: CustomersSearchInput): Promise<Customer[]> {
    return this.customerService.findCustomers(input);
  }

  @Mutation(returns => Customer)
  @UseGuards(GqlAdminAuthGuard)
  createCustomer(@Args('input') input: CustomerCreateInput): Promise<Customer> {
    return this.customerService.create(input);
  }

  @Mutation(returns => Customer)
  @UseGuards(GqlAdminAuthGuard)
  updateCustomer(@Args('input') input: CustomerUpdateInput): Promise<Customer> {
    return this.customerService.update(input);
  }
}
