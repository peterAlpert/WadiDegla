import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.css'
})
export class StadiumComponent implements OnInit {
  controlName: string = '';
  now: Date = new Date();
  todayDate: Date = new Date();
  timeOnly: string = this.now.toTimeString().slice(0, 5);

  member = {
    memberName: '',
    membership: 0,
    date: this.now,
    time: this.timeOnly,
    controlName: this.controlName,
    stadeNo: 1
  };

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    const name = localStorage.getItem('controlName');
    this.controlName = name ?? 'control';

    this.now = new Date();
    this.timeOnly = this.now.toTimeString().slice(0, 5);

    this.resetForm();
  }

  // ✅ التحقق من وجود العضو
  checkMemberExists(membership: number) {
    return this.http.get<boolean>(`${environment.baseUrl}/Member/check/${membership}`);
  }

  // ✅ تسجيل الدخول
  register() {
    const now = new Date();
    this.timeOnly = now.toTimeString().slice(0, 5);
    const dateOnly = now.toISOString().split('T')[0];

    const { memberName, membership, stadeNo } = this.member;

    this.checkMemberExists(membership).subscribe({
      next: (memberExists) => {
        if (!memberExists) {
          // إضافة العضو لأول مرة
          const newMember = {
            memberName,
            membership
          };

          this.http.post(`${environment.baseUrl}/Member/add`, newMember).subscribe({
            next: () => {
              this.addEntry(membership, stadeNo, dateOnly, this.timeOnly);
            },
            error: () => this.toastr.error('فشل في تسجيل بيانات العضو الجديدة')
          });
        } else {
          // العضو موجود فقط سجل الدخول
          this.addEntry(membership, stadeNo, dateOnly, this.timeOnly);
        }
      },
      error: () => this.toastr.error('فشل في التحقق من العضو')
    });
  }

  // ✅ إضافة دخول جديد
  addEntry(membership: number, stadeNo: number, date: string, time: string) {
    const entry = {
      membership,
      stadeNo,
      date,
      time,
      controlName: this.controlName
    };

    this.http.post(`${environment.baseUrl}/Stade/addEntry`, entry).subscribe({
      next: () => {
        this.toastr.success('تم تسجيل الدخول للملعب');
        this.resetForm();
      },
      error: () => {
        this.toastr.error('فشل في تسجيل دخول الملعب');
      }
    });
  }

  // ✅ إعادة تعيين النموذج
  resetForm() {
    this.member = {
      memberName: '',
      membership: 0,
      stadeNo: 1,
      date: this.now,
      time: this.timeOnly,
      controlName: this.controlName
    };
  }

  // ✅ صلاحية النموذج
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
