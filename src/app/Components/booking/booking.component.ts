import { BookingService } from './../../Services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  booking = {
    playerName: '',
    stadiumNo: 1,
    date: '',
    timeSlot: '',
    type: 'full'
  };

  constructor(
    private _ToastrService: ToastrService,
    private _BookingService: BookingService
  ) { }

  timeSlots: string[] = [];

  ngOnInit(): void {
    this.setTodayDate();
    this.generateTimeSlots();
  }

  setTodayDate() {
    const today = new Date();
    this.booking.date = today.toISOString().split('T')[0]; // yyyy-mm-dd
  }

  generateTimeSlots() {
    const start = 16 * 60; // 4:00 مساءً
    const end = 23 * 60 + 30; // 11:30 مساءً
    for (let mins = start; mins <= end; mins += 30) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      this.timeSlots.push(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      );
    }
  }

  submitBooking() {
    this._BookingService.addBooking(this.booking).subscribe({
      next: () => {
        this._ToastrService.success('تم الحجز بنجاح');
      },
      error: () => {
        this._ToastrService.error('حدث خطأ أثناء الحجز');
      }
    });
  }

}
