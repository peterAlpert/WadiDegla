import { SharedService } from './../../Services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  controlName: string = '';
  touched: boolean = false;

  constructor(
    private _SharedService: SharedService,
    private _ToastrService: ToastrService,
    private _router: Router
  ) { }

  saveName() {
    const trimmedName = this.controlName.trim();
    console.log(trimmedName);


    if (trimmedName) {
      this._SharedService.setControlName(trimmedName);
      this._ToastrService.success("تم تسجيل الاسم بنجاح");
      this._router.navigate(['/enterStadium']);

    } else {
      this._ToastrService.error("من فضلك ادخل الاسم");
    }
  }

}
