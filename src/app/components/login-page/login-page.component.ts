import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  formError = '';
  formGroup!: FormGroup;
  login = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  onChangeForm() {
    this.formError = '';
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => (this.formError = err.message),
    });
  }
}
