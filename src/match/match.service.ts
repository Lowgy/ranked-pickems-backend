import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}
}
