import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
    const user = {
      username: this.username,
      password: this.password
    }
    this._HttpClient.post(`${environment.baseUrl}/auth/login`, user).subscribe({
      next: (res: any) => {
        console.log(user);
        localStorage.setItem('token', res.token);
        this._Router.navigate(['/']);
      },
      error: () => alert('بيانات الدخول غير صحيحة')
    });
  }


}
