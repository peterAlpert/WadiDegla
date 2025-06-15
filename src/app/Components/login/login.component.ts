import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router
  ) { }

  login() {
    this._HttpClient.post('https://yourapi.com/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this._Router.navigate(['/']);
      },
      error: () => alert('بيانات الدخول غير صحيحة')
    });
  }


}
