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

  timeSlots: string[] = [];

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const start = 16 * 60; // 4:00 مساءً = 16:00
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
    console.log('تم الحجز:', this.booking);
    // هنا تقدر تبعت البيانات لـ API لو عندك
  }

}
