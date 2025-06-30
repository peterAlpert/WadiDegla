import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../Services/booking.service';

@Component({
  selector: 'app-private-bookings-today',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-4">
      <h3 class="text-center text-primary mb-4">حجوزات ملعب 4 - اليوم</h3>
      <table class="table table-bordered text-center">
        <thead class="table-light" dir="rtl">
          <tr>
            <th>اللاعب</th>
            <th>الساعة</th>
            <th>تم الدفع</th>
            <th>الكنترول</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let booking of privateBookings">
            <td>{{ booking.playerName }}</td>
            <td>{{ booking.timeSlot }}</td>
            <td>
              <span [class]="booking.isPaid ? 'text-success' : 'text-danger'">
                {{ booking.isPaid ? '✔️ نعم' : '❌ لا' }}
              </span>
            </td>
            <td>{{ controlName || 'غير محدد' }}</td>
          </tr>
          <tr *ngIf="privateBookings.length === 0">
            <td colspan="4">لا توجد حجوزات حتى الآن</td>
          </tr>
        </tbody>
      </table>

    </div>
  `
})
export class PrivateBookingsTodayComponent implements OnInit {
  privateBookings: any[] = [];
  controlName: any = '';

  constructor(private _BookingService: BookingService) { }

  ngOnInit(): void {
    this.controlName = localStorage.getItem('controlName');

    const today = new Date().toISOString().split('T')[0];
    this._BookingService.getBookingsByDate(today).subscribe({
      next: (bookings) => {
        this.privateBookings = bookings.filter(
          b => b.stadiumNo === 4 && b.type === 'private'
        );
      }
    });
  }
}
