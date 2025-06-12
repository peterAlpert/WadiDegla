import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViolationService } from '../../Services/violation.service';

@Component({
  selector: 'app-violation-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './violation-details.component.html',
})
export class ViolationDetailsComponent implements OnInit {
  member: any;
  membership: any = 0;
  memberName: any = '';
  type: any = '';
  note: string = '';
  date: string = '';
  time: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private _ToastrService: ToastrService,
    private violationService: ViolationService
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.member = nav?.extras?.state?.['member'];

    if (!this.member) {
      this.memberName = this.route.snapshot.paramMap.get('name');
      this.membership = this.route.snapshot.paramMap.get('id');
      this.type = this.route.snapshot.paramMap.get('type');
      console.warn(this.membership);
      console.warn(this.membership);
    }

    const now = new Date();
    this.date = now.toISOString().split('T')[0];
    this.time = now.toTimeString().split(':').slice(0, 2).join(':');
  }

  saveViolation(type: string) {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(':').slice(0, 2).join(':');

    const violation = {
      name: this.memberName,
      membership: this.membership,
      note: this.note,
      date: date,
      time: time,
      type: this.type
    };

    this.violationService.saveViolation(violation).subscribe(() => {
      this._ToastrService.success('تم الحفظ بنجاح');
      this.location.back();
    });
  }
}
