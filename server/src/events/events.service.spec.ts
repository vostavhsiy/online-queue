import { TransactionHost } from '@nestjs-cls/transactional';
import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from '../appointments/appointments.service';
import { CompaniesService } from '../companies/companies.service';
import { DbService } from '../db/db.service';
import { DurationsService } from '../durations/durations.service';
import { EmailsService } from '../emails/emails.service';
import { MailService } from '../mail/mail.service';
import { SchedulesService } from '../schedules/schedules.service';
import { TimesService } from '../times/times.service';
import { WidgetsService } from '../widgets/widgets.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let dbService: DbService;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        DbService,
        CompaniesService,
        SchedulesService,
        WidgetsService,
        EmailsService,
        DurationsService,
        AppointmentsService,
        MailService,
        MailerService,
        TimesService,
        {
          provide: TransactionHost,
          useValue: new TransactionHost({}),
        },
        {
          provide: 'MAILER_OPTIONS',
          useValue: {
            transport: {
              host: 'smtp.yandex.ru',
              secure: true,
              port: 465,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    dbService = module.get<DbService>(DbService);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create one event', async () => {
    await dbService.$transaction(async (tx) => {
      const companyDto = {
        email: `test${+new Date()}@test.ru`,
        name: 'test',
        password: 'test',
      };
      const company = await companiesService.create(companyDto);
      const eventDto: CreateEventDto = {
        name: 'test ',
      };
      const oldCount = (await service.findAll(company.id)).length;
      const event = await service.create(company.id, eventDto);
      console.log(event);
      const newCount = (await service.findAll(company.id)).length;
      expect(newCount).toBeGreaterThan(oldCount);
      throw 'Rollback';
    });
  });
});
