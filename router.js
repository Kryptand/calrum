import { Router } from '@vaadin/router';
export const onLocationChanged = (listener) => {
    window.addEventListener('vaadin-router-location-changed', listener);
};
export const navigateTo = (url) => {
    console.error({ detail: { pathname: url } });
    window.dispatchEvent(new CustomEvent('vaadin-router-go', { detail: { pathname: url } }));
};
export function init(outlet) {
    const router = new Router(outlet);
    router.setRoutes([
        {
            path: "home" /* Home */,
            component: 'calrum-home',
            action: async () => {
                await import('./src/home/home');
            }
        },
        {
            path: "list" /* DayList */,
            component: 'calrum-day-list',
            action: () => {
                import('./src/day-list/day-list');
            }
        },
        {
            path: "month" /* Month */,
            component: 'calrum-month',
            action: () => {
                import('./src/month/month');
            }
        },
        {
            path: "week" /* Week */,
            component: 'calrum-week',
            action: () => {
                import('./src/week/week');
            }
        },
        {
            path: '/',
            redirect: "home" /* Home */
        },
        {
            path: '(.*)+',
            component: 'calrum-not-found',
            action: () => {
                import('./src/not-found/not-found');
            }
        }
    ]);
}
