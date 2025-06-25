import { StadiumService } from './../../Services/stadium.service';
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

  constructor(
    private http: HttpClient,
    private _StadiumService: StadiumService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const name = localStorage.getItem('controlName');
    this.controlName = name ?? 'control';

    this.now = new Date();
    this.timeOnly = this.now.toTimeString().slice(0, 5);

    this.resetForm();
  }

  register() {
    const { memberName, membership, stadeNo } = this.member;

    console.log(memberName, membership, stadeNo);


    this._StadiumService.checkIfEnteredToday(membership).subscribe({
      next: (hasEntered) => {
        if (hasEntered) {
          this.toastr.warning(`العضو ${memberName} (رقم العضوية: ${membership}) سجل دخول اليوم بالفعل في ملعب ${stadeNo}`);
        } else {
          // تابع التسجيل
          this.saveEntry();
        }
      },
      error: () => {
        this.toastr.error("حدث خطأ أثناء التحقق من الدخول السابق");
      }
    });
  }

  saveEntry() {
    const now = new Date();
    const timeOnly = now.toTimeString().slice(0, 5);
    const dateOnly = now.toISOString().split('T')[0];

    const payload = {
      MemberName: this.member.memberName,
      Membership: this.member.membership,
      StadeNo: this.member.stadeNo,
      Date: dateOnly,
      Time: this.timeOnly,
      ControlName: this.controlName
    };

    this._StadiumService.registerEntry(payload).subscribe({
      next: () => { this.toastr.success("تم تسجيل الدخول ✅"); this.resetForm(); },
      error: () => this.toastr.error("فشل تسجيل الدخول ❌")
    });
  }


  // register() {
  //   const now = new Date();
  //   this.timeOnly = now.toTimeString().slice(0, 5);
  //   const dateOnly = now.toISOString().split('T')[0];

  //   const dto = {
  //     MemberName: this.member.memberName,
  //     Membership: this.member.membership,
  //     StadeNo: this.member.stadeNo,
  //     Date: dateOnly,
  //     Time: this.timeOnly,
  //     ControlName: this.controlName
  //   };

  //   this.http.post(`${environment.baseUrl}/Entry/register-entry`, dto).subscribe({
  //     next: (res: any) => {
  //       this.toastr.success(res.newMember ? 'تم تسجيل العضو والدخول بنجاح' : 'تم تسجيل الدخول للملعب');
  //       this.resetForm();
  //     },
  //     error: () => this.toastr.error('فشل في تسجيل الدخول')
  //   });
  // }

  // ✅ إضافة دخول جديد
  // addEntry(MemberName: string, Membership: number, StadeNo: number, Date: string, Time: string) {
  //   const newEntry = {
  //     MemberName,
  //     Membership,
  //     StadeNo,
  //     Date: this.todayDate,
  //     Time: this.timeOnly,
  //     controlName: this.controlName
  //   };

  //   this.http.post(`${environment.baseUrl}/Stade/addEntry`, newEntry).subscribe({
  //     next: () => {
  //       this.toastr.success('تم تسجيل الدخول للملعب');
  //       this.resetForm();
  //     },
  //     error: () => {
  //       this.toastr.error('فشل في تسجيل دخول الملعب');
  //     }
  //   });
  // }

  // // ✅ التحقق من وجود العضو
  // checkMemberExists(membership: number) {
  //   return this.http.get<boolean>(`${environment.baseUrl}/Member/${membership}`);
  // }

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
  relod() {
    window.location.reload();
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

  // للتأكد من إزالة الصفر الأول واستبدال الأرقام الإنجليزية بالعربية:
  onMembershipChange() {
    if (this.member.membership) {
      let value = this.member.membership.toString();

      // إزالة أول صفر لو موجود
      if (value.startsWith('0')) {
        value = value.substring(1);
      }

      // تحويل الأرقام الإنجليزية إلى عربية
      value = value.replace(/[0-9]/g, d => String.fromCharCode(0x0660 + +d));

      this.member.membership = Number(value);
    }
  }

}
