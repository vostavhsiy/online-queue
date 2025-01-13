import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CustomersModule } from './customers/customers.module';
import { DbModule } from './db/db.module';
import { DurationsModule } from './durations/durations.module';
import { EmailsModule } from './emails/emails.module';
import { EventsModule } from './events/events.module';
import { MailModule } from './mail/mail.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TimesModule } from './times/times.module';
import { WidgetsModule } from './widgets/widgets.module';
import { DbService } from './db/db.service'
import { LibModule } from './lib/lib.module';

@Module({
  imports: [
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [DbModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: DbService,
          }),
        }),
      ],
    }),
    DbModule,
    AuthModule,
    CompaniesModule,
    EventsModule,
    SchedulesModule,
    TimesModule,
    CustomersModule,
    AppointmentsModule,
    DurationsModule,
    MailModule,
    WidgetsModule,
    EmailsModule,
    LibModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
