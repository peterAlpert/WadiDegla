import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.css'
})
export class StadiumComponent implements OnInit {
  controlName: string = ''
  now: Date = new Date();
  todayDate: Date = new Date();
  timeOnly: string = this.now.toTimeString().split(' ')[0]; // "HH:mm:ss" 

  member = {
    memberName: '',
    membership: 0,
    date: this.now,
    time: this.timeOnly,
    controlName: this.controlName,
    stadeNo: 1
  };



  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    const name = localStorage.getItem('controlName');
    this.controlName = name ?? 'control';

    this.now = new Date();
    this.timeOnly = this.now.toTimeString().slice(0, 5); // HH:mm

    this.member = {
      memberName: '',
      membership: 0,
      stadeNo: 1,
      date: this.now,
      time: this.timeOnly,
      controlName: this.controlName
    };
  }

  register() {
    // تحديث الوقت الحالي
    const now = new Date();
    this.timeOnly = now.toTimeString().slice(0, 5); // HH:mm

    const input = this.now.toDateString();
    const date = new Date(input);

    const data = {
      memberName: this.member.memberName,
      membership: this.member.membership,
      date: date.toISOString().split('T')[0],
      time: this.timeOnly,
      controlName: this.controlName,
      stadeNo: this.member.stadeNo
    };

    console.log(data);

    this.http.post(`${environment.baseUrl}/Stade/addStadeData`, data).subscribe({
      next: () => {
        this.toastr.success('تم تسجيل الدخول للملعب بنجاح');

        this.member = {
          memberName: '',
          membership: 0,
          stadeNo: 1,
          date: this.now,
          controlName: this.controlName,
          time: this.timeOnly
        };
      },
      error: () => {
        this.toastr.error('حدث خطأ أثناء التسجيل');
      }
    });
  }

  isFormValid(): boolean {
    const nameValid = this.member.memberName?.trim().split(' ').length >= 2;
    const membershipValid = /^\d{5,6}$/.test(String(this.member.membership));
    return nameValid && membershipValid;
  }

  isMembershipInvalid(): boolean {
    const value = String(this.member.membership || '');
    return !/^\d{5,6}$/.test(value);
  }


}
