import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MeetingService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMeeting() {}
}
