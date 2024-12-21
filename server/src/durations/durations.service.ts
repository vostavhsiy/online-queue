import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from 'generated';
import { DbService } from '../db/db.service';
import { CreateDurationDto } from './dto/create-duration.dto';

@Injectable()
export class DurationsService {
  constructor(
    private txHost: TransactionHost<TransactionalAdapterPrisma>,
    private dbService: DbService,
  ) {}

  async create(createDurationDto: CreateDurationDto, tx?: PrismaClient) {
    try {
      const candidate = await this.txHost.tx.duration.findFirst({
        where: createDurationDto,
      });
      if (candidate) return candidate;
      return this.txHost.tx.duration.create({
        data: createDurationDto,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try {
      return this.dbService.duration.delete({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
