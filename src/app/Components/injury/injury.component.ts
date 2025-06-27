import { InjuryService } from './../../Services/injury.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-injury',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './injury.component.html',
  styleUrl: './injury.component.css'
})
export class InjuryComponent implements OnInit {
  player: any;
  injuryType = '';
  injuryLocation = '';
  actionTaken = '';
  injuryReport = '';
  now = new Date();

  controlName: any = '';

  constructor(
    private location: Location,
    private _InjuryService: InjuryService,
    private _ToastrService: ToastrService
  ) {
    const nav = this.location.getState() as any;
    this.player = nav.player;
  }

  ngOnInit(): void {
    this.controlName = localStorage.getItem('controlName');
  }

  generateInjuryReport() {
    this.injuryReport = `إصابة العضو: ${this.player.memberName}
      رقم عضوية: ${this.player.membership}
      نوع الإصابة: ${this.injuryType}
      مكان الإصابة بالجسم: ${this.injuryLocation}
      مكان الإصابة: ملعب ${this.player.lastEntry.stadeNo}
      الإجراء المتخذ: ${this.actionTaken}
      الكنترول : ${this.controlName}`;
  }

  submitInjuryToDatabase() {
    const injuryData = {
      type: this.injuryType,
      location: this.injuryLocation,
      actionTaken: this.actionTaken,
      memberId: this.player.id,
      stadeNo: this.player.lastEntry.stadeNo,
      date: this.now.toISOString().split('T')[0]

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
