import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../Services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-today',
  templateUrl: './booking-today.component.html',
  styleUrls: ['./booking-today.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookingTodayComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  selectedStadium: number = 0;

  constructor(private bookingService: BookingService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getTodayBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        this.applyFilter();
      },
      error: () => {
        this.toastr.error('حدث خطأ أثناء تحميل الحجز');
      }
    });
  }

  applyFilter() {
    if (this.selectedStadium > 0) {
      this.filteredBookings = this.bookings.filter(b => b.stadiumNo === this.selectedStadium);
    } else {
      this.filteredBookings = [...this.bookings];
    }
  }

  deleteBooking(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.toastr.success('تم حذف الحجز');
          this.loadBookings();
        },
        error: () => {
          this.toastr.error('حدث خطأ أثناء الحذف');
        }
      });
    }
  }
}
