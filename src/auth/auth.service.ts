import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('邮箱或密码错误');
    }
    const isEqual = await this.hashingService.compare(password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException('邮箱或密码错误');
    }
    const accessToken = await this.generateToken(user);
    return {
      accessToken,
    };
  }

  async generateToken(user: User) {
    const token = await this.jwtService.signAsync(
      { userId: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return token;
  }
}
