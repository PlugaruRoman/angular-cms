import { ResolveFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';
import { delay, catchError, EMPTY, mergeMap, of } from 'rxjs';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  return adminService.getUser(route.params?.['id']).pipe(
    delay(2000),
    mergeMap((user) => {
      if (user) {
        return of(!!user);
      } else {
        router.navigate(['contacts']);
        return EMPTY;
      }
    }),
    catchError(() => {
      router.navigate(['admin/contacts']);
      return EMPTY;
    })
  );
};
