import { InjuryService } from './../../Services/injury.service';
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
  now = new Date();

  constructor(
    private location: Location,
    private _InjuryService: InjuryService,
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

  submitInjuryToDatabase() {
    const injuryData = {
      InjuryType: this.injuryType,
      InjuryLocation: this.injuryLocation,
      ActionTaken: this.actionTaken,
      MemberId: this.player.id,
      StadeNo: this.player.firstEntry.stadeNo,
      Date: this.now.toISOString().split('T')[0],
      Time: this.now.toTimeString().slice(0, 5)

    };

    console.log(injuryData);
    console.log(this.player);


    this._InjuryService.addInjury(injuryData).subscribe({
      next: () => {
        this._ToastrService.success('تم حفظ الإصابة في قاعدة البيانات');
      },
      error: () => {
        this._ToastrService.error('حدث خطأ أثناء حفظ الإصابة');
      }
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this._ToastrService.show('تم نسخ التقرير إلى الحافظة ✅');
    });
  }

  isFormInvalid(): boolean {
    return !this.injuryLocation || !this.actionTaken;
  }

}
