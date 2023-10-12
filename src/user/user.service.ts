import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashPassword = await this.hashingService.hash(password);
    const userCreateInput: Prisma.UserCreateInput = {
      ...user,
      password: hashPassword,
      createAt: new Date(),
    };
    return this.prismaService.user.create({
      data: userCreateInput,
    });
  }
}
