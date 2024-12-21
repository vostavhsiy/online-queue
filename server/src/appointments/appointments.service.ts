import { TransactionHost, Transactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from 'generated';
import { DbService } from '../db/db.service';
import { DurationsService } from '../durations/durations.service';
import { MailService } from '../mail/mail.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name, {
    timestamp: true,
  });

  constructor(
    private txHost: TransactionHost<TransactionalAdapterPrisma>,
    private dbService: DbService,
    private durationsService: DurationsService,
    private mailService: MailService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, tx?: PrismaClient) {
    try {
      const { duration: time, ...appointmentDto } = createAppointmentDto;
      const duration = await this.durationsService.create(
        createAppointmentDto.duration,
        tx,
      );
      const appointment = await this.txHost.tx.appointment.create({
        data: {
          ...appointmentDto,
          durationId: duration.id,
        },
        include: {
          event: true,
        },
      });
      return appointment;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.dbService.appointment.findUnique({
        where: { id },
      });
      return appointment;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Transactional()
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const { duration: time, ...appointmentDto } = updateAppointmentDto;
      const duration = await this.durationsService.create(
        updateAppointmentDto.duration,
      );
      const appointment = await this.txHost.tx.appointment.update({
        where: { id },
        data: {
          ...appointmentDto,
          durationId: duration.id,
        },
      });
      return appointment;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try {
      this.logger.debug(id);
      const appointment = await this.dbService.appointment.delete({
        where: { id },
        include: {
          event: {
            include: {
              company: {
                include: { emailHtml: true },
              },
            },
          },
          customer: {
            include: {
              appointment: {
                include: {
                  duration: true,
                },
              },
            },
          },
        },
      });
      if (appointment.customer) {
        await this.mailService.sendCustomerDeleteAppointmentMail(
          appointment?.event?.company?.name,
          appointment?.event?.company?.emailHtml,
          appointment?.customer,
        );
      }
      return appointment;
    } catch (e) {
      this.logger.error(e);
      throw new NotFoundException(e.message);
    }
  }
}
