import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PickService {
  constructor(private prisma: PrismaService) {}
}
