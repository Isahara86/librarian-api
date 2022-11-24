import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { AdminService } from './admin.service';

@Module({
  providers: [CustomerService, AdminService, CustomerResolver],
  exports: [CustomerService, AdminService],
})
export class UserModule {}
