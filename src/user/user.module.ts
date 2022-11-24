import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';

@Module({
  providers: [CustomerService, AdminService, CustomerResolver, AdminResolver],
  exports: [CustomerService, AdminService],
})
export class UserModule {}
