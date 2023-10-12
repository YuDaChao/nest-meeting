import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingModule } from '../hashing/hashing.module';

@Module({
  imports: [HashingModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
