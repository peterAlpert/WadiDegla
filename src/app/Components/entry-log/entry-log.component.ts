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
  ControlName: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _EntryService: EntryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ControlName = localStorage.getItem('controlName');
    const nav = history.state;
    if (nav && nav.member) {
      this.member = nav.member;

      const now = new Date();
      this.Date = now.toISOString().split('T')[0]; // yyyy-mm-dd
      this.Time = now.toTimeString().split(' ')[0].slice(0, 5); // hh:mm
    } else {
      this.router.navigate(['/']); // رجوع في حالة عدم وجود بيانات
    }
  }

  submitEntry() {
    const entryData = {
      MemberName: this.member?.MemberName,
      Membership: this.member?.Membership,
      StadeNo: this.StadeNo,
      Date: this.Date,
      Time: this.Time,
      ControlName: this.ControlName
    };

    console.log(entryData);

    this._EntryService.addEntry(entryData).subscribe({
      next: () => {
        this.toastr.success('تم تسجيل دخول العضو بنجاح');
        this.router.navigate(['/stadium-log']);
      },
      error: () => {
        this.toastr.error('حدث خطأ أثناء التسجيل');
      }
    });
  }
}
