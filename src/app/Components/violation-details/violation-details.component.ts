import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViolationService } from '../../Services/violation.service';

@Component({
  selector: 'app-violation-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './violation-details.component.html',
})
export class ViolationDetailsComponent {
  player: any;
  violationType: string = '';
  notes: string = '';
  date = new Date().toISOString();
  violationReport = '';

  constructor(
    private location: Location,
    private violationService: ViolationService,
    private toastr: ToastrService
  ) {
    const nav = this.location.getState() as any;
    this.player = nav.player;
  }


  submitViolation() {
    const payload = {
      memberId: this.player.id,
      type: this.violationType,
      notes: this.notes,
      date: this.date
    };

    this.violationService.saveViolation(payload).subscribe({
      next: () => this.toastr.success('تم تسجيل المخالفة ✅'),
      error: () => this.toastr.error('حدث خطأ أثناء التسجيل ❌')
    });
  }

  isFormInvalid(): boolean {
    return !this.violationType || !this.notes;
  }


  generateViolationReport() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.violationReport = `📌 تقرير ${this.violationType}
الاسم: ${this.player.memberName}
رقم العضوية: ${this.player.membership}
رقم الملعب: ${this.player.stadeNo}
الوقت: ${time}
التاريخ: ${date}
الملاحظات: ${this.notes}`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.toastr.success('تم نسخ التقرير إلى الحافظة ✅');
    });
  }
}
