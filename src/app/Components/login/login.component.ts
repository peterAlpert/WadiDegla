import { ToastrService } from 'ngx-toastr';
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
    private _Router: Router,
    private _ToastrService: ToastrService
  ) { }


  login() {
    const user = {
      username: this.username,
      password: this.password
    }
    console.log(user);
    this._HttpClient.post(`${environment.baseUrl}/Auth/login`, user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this._ToastrService.success("تم تسجيل الدخول بنجاح")
        this._Router.navigate(['/controlInfo']);

      },
      error: () => this._ToastrService.error("بيانات الدخول غير صحيحه")
    });
  }


}
