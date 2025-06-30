import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../Services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './private-booking.component.html',
  styleUrl: './private-booking.component.css'
})
export class PrivateBookingComponent implements OnInit {
  booking = {
    playerName: '',
    stadiumNo: 4,
    date: '',
    timeSlot: '',
    type: 'private',
    isPaid: false,
    controlName: ''
  };


  timeSlots: string[] = [];

  constructor(
    private _BookingService: BookingService,
    private _Toastr: ToastrService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.booking.date = today;

    const controlName = localStorage.getItem('controlName');
    this.booking.controlName = controlName ?? 'غير معروف';

    this.generatePrivateTimeSlots();


  }

  setTodayDate() {
    const today = new Date();
    this.booking.date = today.toISOString().split('T')[0];
  }

  generatePrivateTimeSlots() {
    const startHour = 16; // 4:00
    const endHour = 22;   // 10:00
    const startMinute = 30; // يبدأ من 4:30

    this.timeSlots = [];

    for (let h = startHour; h <= endHour; h++) {
      const from = `${this.format12Hour(h, 30)}`;
      const to = `${this.format12Hour(h + 1, 30)}`;
      this.timeSlots.push(`${from} - ${to}`);
    }
  }

  format12Hour(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    let h = hour % 12;
    if (h === 0) h = 12;
    return `${h}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  submitBooking() {
    this._BookingService.getBookingsByDate(this.booking.date).subscribe({
      next: (bookings) => {
        const alreadyBooked = bookings.some(
          b => b.stadiumNo === 4 && b.timeSlot === this.booking.timeSlot
        );

        if (alreadyBooked) {
          this._Toastr.error('⚠️ هذه الساعة محجوزة بالفعل في ملعب 4 اليوم');
          return;
        }

        this._BookingService.addBooking(this.booking).subscribe({
          next: () => {
            this._Toastr.success('✅ تم حجز ملعب 4 بنجاح');
          },
          error: () => {
            this._Toastr.error('حدث خطأ أثناء الحجز');
          }
        });
      },
      error: () => {
        this._Toastr.error('حدث خطأ أثناء التحقق من الحجوزات');
      }
    });
  }


  viewTodayPrivateBookings() {
    this._Router.navigate(['/private-bookings-today']);
  }

}
