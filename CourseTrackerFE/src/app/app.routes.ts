import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { MenuRoute } from './core/menu-route';

export const menuRoutes: MenuRoute[] = [
  {
    path: '',
    loadComponent: () => import('./features/subscriptions/subscriptions.component').then(c => c.SubscriptionsComponent),
    data: { key: 'subscriptions' },
    menuLabel: 'Subscriptions',
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses.component').then(c => c.CoursesComponent),
    data: { key: 'courses' },
    menuLabel: 'Courses',
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then(c => c.UsersComponent),
    data: { key: 'users' },
    menuLabel: 'Users',
  }
];

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: menuRoutes,
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent),
  },
];
