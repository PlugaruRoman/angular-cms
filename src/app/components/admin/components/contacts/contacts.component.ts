import { Component, OnInit } from '@angular/core';
import { Observable, filter, map, mapTo, merge } from 'rxjs';
import { User } from '../../types/user';
import { AdminService } from '../../services/admin.service';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  private showLoader?: Observable<boolean>;
  private hideLoader?: Observable<boolean>;
  isLoading?: Observable<boolean>;

  contactsList?: Observable<User[]>;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.contactsList = this.adminService.getPersonalList();

    this.hideLoader = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map((value) => !value)
    );

    this.showLoader = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map((value) => !!value)
    );

    this.isLoading = merge(this.hideLoader, this.showLoader);
  }
}
