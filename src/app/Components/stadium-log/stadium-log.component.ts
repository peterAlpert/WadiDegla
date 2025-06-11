import { StadiumService } from './../../Services/stadium.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // ⬅️ ضيف ده
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Iplayer } from '../../Interfaces/iplayer';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stadium-log',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './stadium-log.component.html',
  styleUrl: './stadium-log.component.css'
})
export class StadiumLogComponent implements OnInit {
  allData: any[] = [];
  filteredData: any[] = [];
  filterDate: string = '';
  controlName: string = '';
  player: Iplayer = {} as Iplayer;

  constructor(
    private http: HttpClient,
    private _StadiumService: StadiumService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    const now = new Date();
    this.controlName = localStorage.getItem('controlName') || 'control';

    this._StadiumService.getAll().subscribe((res: any) => {
      this.allData = res;
      this.filteredData = res;
    });

    const name = localStorage.getItem('controlName');
    this.controlName = name ?? 'control';
    this.getAllData();
  }

  getAllData() {
    this._StadiumService.getAll().subscribe(data => {
      this.allData = data;
      this.filteredData = data;
      this.checkWarnings();
    });
  }

  filterByStadium(no: number) {
    this.filteredData = this.allData.filter(x => x.stadeNo == no);
  }

  showAll() {
    this.filteredData = this.allData;
  }

  filterByDate() {
    if (!this.filterDate) {
      this.filteredData = this.allData;
      return;
    }

    this.filteredData = this.allData.filter(item => item.date === this.filterDate);
  }


  convertTo12Hour(time: string): string {
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    hour = hour % 12 || 12;
    return `${hour}:${minute}`;
  }

  resetDateFilter() {
    this.filterDate = '';
    this.filteredData = this.allData;
  }

  searchTerm: string = '';
  selectedControl: string = '';
  controlNames: string[] = [];

  filterBySearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.allData.filter(item =>
      item.memberName.toLowerCase().includes(term) ||
      item.membership.toString().includes(term)
    );
  }

  filterByControl() {
    this.filteredData = this.selectedControl
      ? this.allData.filter(x => x.controlName === this.selectedControl)
      : this.allData;
  }



  insult(player: Iplayer) {
    console.log(player);

    this._Router.navigate([`/violation/${player.membership}/insult`], { state: { member: player } });
  }

  joke(player: Iplayer) {
    this._Router.navigate([`/violation/${player.membership}/joke`], { state: { member: player } });
  }

  fight(player: Iplayer) {
    this._Router.navigate([`/violation/${player.membership}/fight`], { state: { member: player } });

  }

  viewHistory(member: any) {
    this._Router.navigateByUrl('/violation-history', { state: { member } });
  }


  checkWarnings() {
    this.filteredData.forEach(player => {
      if (player.insult >= 5) {
        this._ToastrService.warning(`${player.memberName} تجاوز عدد التلفظات (أكثر من 5)!`);
      }
      if (player.joke >= 5) {
        this._ToastrService.warning(`${player.memberName} تجاوز عدد الهزار الغير لائق (أكثر من 5)!`);
      }
      if (player.fight >= 5) {
        this._ToastrService.warning(`${player.memberName} تجاوز عدد المشادات (أكثر من 5)!`);
      }
    });
  }

  sortBy(type: 'insult' | 'joke' | 'fight') {
    this.filteredData.sort((a, b) => b[type] - a[type]);
  }

  goToInjuryPage(player: any) {
    this._Router.navigate(['/injury'], { state: { player } });
  }

}
