import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as hbs from 'express-handlebars';
import { Prisma } from 'generated';
import * as moment from 'moment';
import { Frequency, RRule, RRuleSet } from 'rrule';
import { LibService } from 'src/lib/lib.service';
import { DbService } from './../db/db.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetsService {
  engine = hbs.create();

  constructor(
    private dbService: DbService,
    private libService: LibService,
  ) {}

  async findOne(id: string) {
    try {
      const widget = await this.dbService.widget.findUnique({
        where: { id },
        include: {
          company: {
            include: {
              events: {
                include: {
                  appointments: true,
                  schedule: {
                    include: {
                      times: {
                        include: {
                          times: true,
                          appointments: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const renderData = {
        name: widget.company.name,
        email: widget.company.email,
        events: widget.company.events,
        apiUrl: process.env.API_URL,
      };
      if (widget.customHtml) {
        const template = this.engine.handlebars.compile(widget.customHtml, {});
        const html = template(renderData);
        return { html };
      }
      const html = await this.engine.render('views/widget.hbs', renderData);
      const url = this.libService.getServerAddress();
      return { html, url };
    } catch (error) {
      console.log(error);
      throw new NotFoundException({}, { cause: error });
    }
  }

  async getWidgetAppointments(id: string) {
    try {
      const widget = await this.dbService.widget.findUnique({
        where: { id },
        include: {
          company: {
            include: {
              events: {
                include: {
                  appointments: {
                    include: {
                      duration: true,
                      event: true,
                      customer: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const events = await this.dbService.event.findMany();
      const appointments = this.serializedAppointments(widget.company.events);
      return appointments;
    } catch (error) {
      console.log(error);
      throw new NotFoundException({}, { cause: error });
    }
  }

  async create(createWidgetDto: CreateWidgetDto) {
    try {
      const widget = await this.dbService.widget.create({
        data: createWidgetDto,
      });
      return widget;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({}, { cause: error });
    }
  }

  async update(id: string, updateWidgetDto: UpdateWidgetDto) {
    try {
      const widget = await this.dbService.widget.update({
        where: { id },
        data: updateWidgetDto,
      });
      return widget;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({}, { cause: error });
    }
  }

  async remove(id: string) {
    try {
      const widget = await this.dbService.widget.delete({
        where: { id },
      });
      return widget;
    } catch (error) {
      console.log(error);
      throw new NotFoundException({}, { cause: error });
    }
  }

  private serializedAppointments(
    events: Prisma.EventGetPayload<{
      include: { appointments: { include: { duration: true; event: true } } };
    }>[],
  ) {
    try {
      const appointments = events.reduce((acc, event) => {
        return [...acc, ...event.appointments];
      }, []);
      const serializedAppointments = appointments
        .filter((app) => !app.customer)
        .map((appointment) => {
          console.log('appointment', appointment);
          const start = new Date(appointment.date);
          start.setHours(+appointment.duration.from.split(':')[0]);
          start.setMinutes(+appointment.duration.from.split(':')[1]);
          console.log(
            'start',
            new Date(moment(start).format('YYYY-MM-DDTHH:mm:00')),
          );
          const end = new Date(appointment.date);
          end.setHours(+appointment.duration.to.split(':')[0]);
          end.setMinutes(+appointment.duration.to.split(':')[1]);
          console.log('end', end);
          let rruleSet;
          if (appointment.weekDay != undefined) {
            rruleSet = new RRuleSet();
            rruleSet.rrule(
              new RRule({
                freq: Frequency.WEEKLY,
                interval: 1,
                byweekday: appointment.weekDay,
                dtstart: new Date(moment(start).format('YYYY-MM-DDTHH:mm:00')),
              }),
            );
            appointments
              .filter((app) => app.customer)
              .forEach((app) => {
                rruleSet.exdate(
                  new Date(
                    moment(app.date)
                      .set({
                        hour: start.getHours(),
                        minute: start.getMinutes(),
                        second: start.getSeconds(),
                      })
                      .format('YYYY-MM-DDTHH:mm:00'),
                  ),
                );
              });
          }

          const rrule = rruleSet?.toString() && {
            freq: Frequency.WEEKLY,
            interval: 1,
            byweekday: appointment.weekDay,
            dtstart: moment(start).format('YYYY-MM-DDTHH:mm:00'),
          };

          const startTime = {
            hours: +appointment.duration.from.split(':')[0],
            minutes: +appointment.duration.from.split(':')[1],
          };

          const endTime = {
            hours: +appointment.duration.to.split(':')[0],
            minutes: +appointment.duration.to.split(':')[1],
          };

          const durationMinutes =
            endTime.hours * 60 +
            endTime.minutes -
            startTime.hours * 60 -
            startTime.minutes;

          return {
            id: appointment.id,
            title: appointment.event.name,
            start: moment(start).format('YYYY-MM-DDTHH:mm:00'),
            end: moment(end).format('YYYY-MM-DDTHH:mm:00'),
            duration: {
              minutes: durationMinutes,
            },
            exdate: appointments
              .filter((app) => app.customer)
              .map((app) => {
                return moment(app.date)
                  .set({
                    hour: start.getHours(),
                    minute: start.getMinutes(),
                    second: start.getSeconds(),
                  })
                  .format('YYYY-MM-DDTHH:mm:00');
              }),
            rrule,
            event: appointment.event,
            customer: appointment.customer,
          } as any;
        });
      return serializedAppointments;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
