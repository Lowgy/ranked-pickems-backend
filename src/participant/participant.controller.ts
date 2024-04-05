import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('participant')
export class ParticipantController {
  constructor(private prisma: PrismaService) {}
}
