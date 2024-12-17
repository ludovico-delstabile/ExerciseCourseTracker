import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const menuRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/subscriptions/subscriptions.component').then(c => c.SubscriptionsComponent),
    data: { key: 'subscriptions' },
    title: 'Subscriptions',
  },
  {
    path: 'available-courses',
    loadComponent: () => import('./features/available-courses/available-courses.component').then(c => c.AvailableCoursesComponent),
    data: { key: 'available-courses' },
    title: 'Available Courses',
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses.component').then(c => c.CoursesComponent),
    data: { key: 'courses' },
    title: 'Courses',
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then(c => c.UsersComponent),
    data: { key: 'users' },
    title: 'Users',
  },
];

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: menuRoutes,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent),
  },
];
