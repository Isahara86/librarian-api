import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  findById(id: number): Promise<Admin> {}
}
