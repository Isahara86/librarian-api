import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { BookInventoryReservationService } from '../modules/book/book-inventory-reservation.service';
import { BookInventoryReservationSearchInput } from './inputs/book-inventory-reservation-search.input';
import { BookInventoryReservationCreateInput } from './inputs/book-inventory-reservation-create.input';
import { BookInventoryReservationUpdateInput } from './inputs/book-inventory-reservation-update.input';
import { BookInventoryReservation } from './models/book-inventory-reservation.model';
import { CustomerDetailsReservation } from './models/customer-details-reservation.model';
import { CustomerReservationsSearchInput } from './inputs/customer-reservations-search.input';

@Resolver(of => BookInventoryReservation)
export class BookInventoryReservationResolver {
  constructor(private readonly bookReservationService: BookInventoryReservationService) {}

  @Query(returns => [CustomerDetailsReservation])
  @UseGuards(GqlAdminAuthGuard)
  async customerReservationHistory(
    @Args('input') input: CustomerReservationsSearchInput,
  ): Promise<CustomerDetailsReservation[]> {
    return this.bookReservationService.findCustomerReservationHistory(input);
  }

  @Query(returns => [BookInventoryReservation])
  @UseGuards(GqlAdminAuthGuard)
  async bookReservationHistory(
    @Args('input') input: BookInventoryReservationSearchInput,
  ): Promise<BookInventoryReservation[]> {
    return this.bookReservationService.findReservations(input);
  }

  @Mutation(returns => BookInventoryReservation)
  @UseGuards(GqlAdminAuthGuard)
  async createBookReservation(
    @Args('input') input: BookInventoryReservationCreateInput,
  ): Promise<BookInventoryReservation> {
    return this.bookReservationService.createReservation(input);
  }

  @Mutation(returns => BookInventoryReservation)
  @UseGuards(GqlAdminAuthGuard)
  async updateBookReservation(
    @Args('input') input: BookInventoryReservationUpdateInput,
  ): Promise<BookInventoryReservation> {
    return this.bookReservationService.updateReservation(input);
  }
}
