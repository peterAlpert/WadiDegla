import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from './../../Services/stadium.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entry-log',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './entry-log.component.html',
  styleUrls: ['./entry-log.component.css']
})
export class EntryLogComponent implements OnInit {
  member: any;
  stadeNo: number = 1;
  date: string = '';
  time: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stadiumService: StadiumService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const nav = history.state;
    if (nav && nav.member) {
      this.member = nav.member;

      const now = new Date();
      this.date = now.toISOString().split('T')[0]; // yyyy-mm-dd
      this.time = now.toTimeString().split(' ')[0].slice(0, 5); // hh:mm
    } else {
      this.router.navigate(['/']); // رجوع في حالة عدم وجود بيانات
    }
  }

  submitEntry() {
    const entryData = {
      memberId: this.member.id,
      stadeNo: this.stadeNo,
      date: this.date,
      time: this.time
    };

    this.stadiumService.addEntry(entryData).subscribe({
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
