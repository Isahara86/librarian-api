import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AdminService } from './admin.service';

@Module({
  providers: [CustomerService, AdminService],
  exports: [CustomerService, AdminService],
})
export class UserModule {}
