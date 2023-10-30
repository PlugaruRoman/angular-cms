import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Observable, map } from 'rxjs';
import { User } from '../../types/user';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.scss'],
})
export class ContactsDetailsComponent implements OnInit {
  id?: number;
  user?: Observable<User>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.activatedRoute.data.pipe(map((data) => data?.['user']));
  }

  showUser() {
    console.log(this.activatedRoute.data.pipe(map((data) => data?.['users'])));
  }
}
