import { Calendar, EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule';
import axios from 'axios';
import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import Loader from '../Loader/Loader';
import styles from './Widget.module.css';

const apiUrl = 'https://online-queue.ru/server';

interface Props {
  widgetId?: string;
}

interface EventInfo {
  id: string;
  title: string;
  date: string;
  time: {
    from: string;
    to: string;
  };
}

const Widget: FC<Props> = ({ widgetId }) => {
  const [fetching, setFetching] = useState(true);

  const [data, setData] = useState(null);
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [appointments, setAppointments] = useState(null);
  const [currentEvent, setCurrentEvent] = useState<EventInfo | null>(null);

  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiUrl) return;
    axios
      .get(apiUrl + '/widgets/' + widgetId)
      .then((res) => res.data)
      .then((data) => {
        const root = wrapper.current;
        if (!root) return;
        root.innerHTML = data.html;
        renderCalendar().then(() => {
          setData(data);
          setFetching(false);
        });
      });
  }, []);

  useEffect(() => {
    if (currentEvent) {
      openForm();
      document
        .getElementById('online-queue-form')
        ?.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!event.target) return;
          const data = new FormData(event.target as HTMLFormElement);
          const body = {
            email: data.get('email'),
            name: data.get('name'),
            phone: data.get('phone'),
            appointmentId: data.get('appointmentId'),
            info: currentEvent,
          };
          setFetching(true);
          //@ts-ignore
          fetch(event.target.action, {
            body: JSON.stringify(body),
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                openError();
                setFetching(false);
                return;
              }
              fetch(apiUrl + '/widgets/' + widgetId + '/appointments')
                .then((res) => res.json())
                .then((data) => {
                  calendar?.batchRendering(() => {
                    calendar.getEvents().forEach((event) => event.remove());
                    calendar.addEventSource(data);
                  });
                  openSuccess();
                  setFetching(false);
                  //@ts-ignore
                  event.target!.reset();
                });
            });
        });
    } else {
      closeForm();
    }
  }, [currentEvent]);

  const renderCalendar = async () => {
    const { data } = await axios.get(
      apiUrl + '/widgets/' + widgetId + '/appointments',
    );
    if (!data) throw 'Ошибка';
    const calendarRoot = document.getElementById('online-queue-calendar');
    if (!calendarRoot) throw 'Ошибка';
    calendarRoot.innerHTML = '';
    const calendar = new Calendar(calendarRoot as HTMLElement, {
      plugins: [rrulePlugin, dayGridPlugin],
      locale: ruLocale,
      events: data,
      eventClick: handleClickEvent,
    });
    setCalendar(calendar);
    calendar.render();
    setAppointments((prev) => data);
    document.querySelectorAll('#online-queue-form .close').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeSuccess();
        closeError();
        closeForm();
      });
    });
    document
      .querySelectorAll('.online-queue-widget__select__label')
      .forEach((label) => {
        label.addEventListener('click', () => {
          const input = document.getElementById(
            'online-queue-widget__select__input',
          );
          if (input) {
            const eventId = label.getAttribute('data-event-id');
            const eventName = label.getAttribute('data-event-name');
            if (eventId) {
              //@ts-ignore
              input.value = eventName;
              const appointments = data.filter(
                (app: any) => app.event.id === eventId,
              );
              if (appointments) {
                calendar.removeAllEvents();
                calendar.addEventSource(appointments);
                calendar.refetchEvents();
                // calendar.batchRendering(() => {
                // calendar.getEvents().forEach((event) => event.remove());
                // calendar.addEventSource(appointments);
                // });
              }
            }
          }
          document
            .querySelector('.online-queue-widget__select__inner')
            ?.removeAttribute('open');
        });
      });
  };

  const openForm = () => {
    if (!currentEvent) return;
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    const details = document.getElementById('online-queue-widget__details');
    if (details) {
      //@ts-ignore
      details.open = false;
    }
    const info = document.querySelector('#online-queue-form #info');
    if (info) {
      info.innerHTML = `
      <div class="info-inner">
        <p class="title">${currentEvent.title}</p>
        <div class="info-time">
          <span>${currentEvent.date}</span>
          <span>с ${currentEvent.time.from} до ${currentEvent.time.to}</span>
        </div>
      </div>
    `;
    }
    //@ts-ignore
    document!.querySelector('#online-queue-form #appointmentId')!.value =
      currentEvent.id;
    form.classList.remove('hidden');
    form.classList.add('active');
  };

  const closeForm = () => {
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    form.classList.remove('active');
    form.classList.add('hidden');
    setTimeout(() => {
      const info = document.querySelector('#online-queue-form #info');
      if (info) info.innerHTML = '';
    }, 1000);
  };

  const handleClickEvent = (eventInfo: EventClickArg) => {
    const info = {
      id: eventInfo.event.id,
      title: eventInfo.event.title,
      date: moment(eventInfo.event.start).format('YYYY-MM-DD'),
      time: {
        from: moment(eventInfo.event.start).format('HH:mm'),
        to: moment(eventInfo.event.end).format('HH:mm'),
      },
    };
    setCurrentEvent(info);
  };

  const openSuccess = () => {
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    const success = document.createElement('div');
    success.innerHTML = `
      <p>Вы записаны!</p>
      <button type="button" class="close">Назад</button>
    `;
    success.classList.add('success');
    success.classList.add('active');
    form.appendChild(success);
    document
      .querySelector('#online-queue-form .success .close')
      ?.addEventListener('click', () => {
        closeSuccess();
        closeForm();
      });
  };

  const closeSuccess = () => {
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    const success = document.querySelector('#online-queue-form .success');
    if (!success) return;
    success.classList.remove('active');
    success.classList.add('hidden');
    setTimeout(() => {
      form.removeChild(success);
    }, 1000);
  };

  const openError = () => {
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    closeSuccess();
    const error = document.createElement('div');
    error.innerHTML = `
      <p>Произошла ошибка!</p>
      <button type="button" class="close">Назад</button>
    `;
    error.classList.add('error');
    error.classList.add('active');
    form.appendChild(error);
    document
      .querySelector('#online-queue-form .error .close')
      ?.addEventListener('click', () => {
        closeError();
        closeForm();
      });
  };

  const closeError = () => {
    const form = document?.getElementById('online-queue-form');
    if (!form) return;
    const error = document.querySelector('#online-queue-form .error');
    if (!error) return;
    error.classList.remove('active');
    error.classList.add('hidden');
    setTimeout(() => {
      form.removeChild(error);
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      {fetching && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {!fetching && !data && (
        <div className={styles.loader}>
          <p className={styles.text}>
            Произошла ошибка при загрузке виджета!
            <br /> Попробуйте перезагрузить страницу.
          </p>
        </div>
      )}
      <div ref={wrapper}></div>
    </div>
  );
};

export default Widget;
