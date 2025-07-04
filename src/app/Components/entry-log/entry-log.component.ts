import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from './../../Services/stadium.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { EntryService } from '../../Services/entry.service';

@Component({
  selector: 'app-entry-log',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './entry-log.component.html',
  styleUrls: ['./entry-log.component.css']
})
export class EntryLogComponent implements OnInit {
  member: any;
  StadeNo: number = 1;
  Date: string = '';
  Time: string = '';
  memNam: string = '';
  memShip: number = 0;
  ControlName: any;

  constructor(
    private route: ActivatedRoute,
    private _StadiumService: StadiumService,
    private router: Router,
    private _EntryService: EntryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ControlName = localStorage.getItem('controlName');

    const nav = history.state;
    if (nav && nav.member) {
      this.member = nav.member;
      this.memNam = nav.member.memberName || nav.member.MemberName;
      this.memShip = nav.member.membership || nav.member.Membership;

      const now = new Date();
      this.Date = now.toISOString().split('T')[0]; // yyyy-mm-dd
      this.Time = now.toLocaleTimeString('en-GB', { hour12: false });
    } else {
      this.router.navigate(['/']); // رجوع في حالة عدم وجود بيانات
    }
  }

  submitEntry() {
    const entryData = {
      MemberName: this.memNam,
      Membership: this.memShip,
      StadeNo: this.StadeNo,
      Date: this.Date,
      Time: this.Time,
      ControlName: this.ControlName
    };

    // تحقق إذا كان العضو دخل النهارده في أي ملعب
    this._StadiumService.checkIfEnteredToday(this.memShip).subscribe({
      next: (hasEntered: boolean) => {
        if (hasEntered && [1, 2, 3, 4].includes(this.StadeNo)) {
          this.toastr.warning('⚠️ هذا العضو دخل بالفعل أحد الملاعب اليوم. لا يمكن التسجيل مرة أخرى.');
          return; // منع الاستكمال
        }

        // إذا لم يدخل من قبل، يتم التسجيل
        this._StadiumService.registerEntry(entryData).subscribe({
          next: () => {
            this.toastr.success('✅ تم تسجيل دخول العضو بنجاح');
            this.router.navigate(['/stadiumLog']);
          },
          error: () => {
            this.toastr.error('❌ حدث خطأ أثناء التسجيل');
          }
        });
      },
      error: () => {
        this.toastr.error('❌ حدث خطأ أثناء التحقق من السجلات');
      }
    });
  }

}
