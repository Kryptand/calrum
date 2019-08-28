import { Router } from '@vaadin/router';
import { Routes } from './config/routes';
export const onLocationChanged = (listener: EventListenerOrEventListenerObject) => {
  window.addEventListener('vaadin-router-location-changed', listener);
};

export const navigateTo = (url: any) => {
  console.error({ detail: { pathname: url } });
  window.dispatchEvent(
    new CustomEvent('vaadin-router-go', { detail: { pathname: url } })
  );
};
export function init(outlet: HTMLElement | null) {
    const router = new Router(outlet,{});
    router.setRoutes([
      {
        path: Routes.Home,
        component: 'calrum-home',
        action: async ()=> {
        await import('./home/home');
        }
      },
     
      {
        path: Routes.DayList,
        component: 'calrum-day-list',
        action: () => {
          import('./day-list/day-list');
        }
      },
      {
        path: Routes.Month,
        component: 'calrum-month',
        action: () => {
          import('./month/month');
        }
      },
      {
        path: Routes.Week,
        component: 'calrum-week',
        action: () => {
          import('./week/week');
        }
      },
      {
        path: '/',
        redirect: Routes.Home
      },
      {
        path: '(.*)+',
        component: 'calrum-not-found',
        action: () => {
          import('./not-found/not-found');
        }

      }
    ]);
  }