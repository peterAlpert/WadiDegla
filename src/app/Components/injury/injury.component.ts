import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-injury',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './injury.component.html',
  styleUrl: './injury.component.css'
})
export class InjuryComponent {
  player: any;
  injuryType = '';
  injuryLocation = '';
  actionTaken = '';
  injuryReport = '';

  constructor(
    private location: Location,
    private _ToastrService: ToastrService
  ) {
    const nav = this.location.getState() as any;
    this.player = nav.player;
  }

  generateInjuryReport() {
    this.injuryReport = `إصابة العضو: ${this.player.memberName}
      رقم عضوية: ${this.player.membership}
      نوع الإصابة: ${this.injuryType}
      مكان الإصابة بالجسم: ${this.injuryLocation}
      مكان الإصابة: ملعب ${this.player.stadeNo}
      الإجراء المتخذ: ${this.actionTaken}`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this._ToastrService.show('تم نسخ التقرير إلى الحافظة ✅');
    });
  }

}
