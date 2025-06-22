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

  //voice btns
  recognition: any;
  isRecording = false;

  //pagination
  pageSize = 10;
  currentPage = 1;
  pagedData: any[] = [];

  constructor(
    private http: HttpClient,
    private _StadiumService: StadiumService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    const now = new Date();
    this.controlName = localStorage.getItem('controlName') || 'control';

    // this._StadiumService.getAll().subscribe((res: any) => {
    //   this.allData = res;
    //   this.filteredData = res;
    //   this.updatePagedData();
    // });

    const name = localStorage.getItem('controlName');
    this.controlName = name ?? 'control';
    this.getAllData();
  }

  //pagination funcs
  updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  getAllData() {
    this.http.get<any[]>(`${environment.baseUrl}/Entry/first-entries`).subscribe(
      (res) => {
        this.allData = res;
        this.filteredData = res;
        console.log(res);

        this.updatePagedData();
      });

  }

  filterByStadium(no: number) {
    this.filteredData = this.allData.filter(x => x.stadeNo == no);
    this.currentPage = 1;
    this.updatePagedData();
  }

  showAll() {
    this.filteredData = this.allData;
    this.currentPage = 1;
    this.updatePagedData();
  }

  filterByDate() {
    if (!this.filterDate) {
      this.filteredData = this.allData;
      return;
    }

    this.filteredData = this.allData.filter(item => item.date === this.filterDate);
    this.currentPage = 1;
    this.updatePagedData();
  }


  convertTo12Hour(dateTime: string | Date | null): string {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }


  resetDateFilter() {
    this.filterDate = '';
    this.filteredData = this.allData;
    this.currentPage = 1;
    this.updatePagedData();
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
    this.currentPage = 1;
    this.updatePagedData();
  }

  // filterByControl() {
  //   this.filteredData = this.selectedControl
  //     ? this.allData.filter(x => x.controlName === this.selectedControl)
  //     : this.allData;
  // }

  startVoiceSearch() {
    this.isRecording = true;
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'ar-EG';
    this.recognition.continuous = false;

    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      this.searchTerm = speechResult;
      this.filterBySearch();
    };

    this.recognition.onerror = (event: any) => {
      console.error('حدث خطأ في التعرف على الصوت:', event.error);
    };

    this.recognition.start();
  }

  stopVoiceSearch() {
    this.isRecording = false;
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterBySearch();
  }




  insult(player: Iplayer) {
    console.log(player);

    this._Router.navigate([`/violation/${player.memberName}/${player.membership}/insult`], { state: { member: player } });
  }

  joke(player: Iplayer) {
    this._Router.navigate([`/violation/${player.memberName}/${player.membership}/joke`], { state: { member: player } });
  }

  fight(player: Iplayer) {
    this._Router.navigate([`/violation/${player.memberName}/${player.membership}/fight`], { state: { member: player } });

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

  goToEntryPage(member: any) {
    this._Router.navigate(['/entry-log'], { state: { member } });
  }

  viewEntryHistory(member: any) {
    console.log(member);

    this._Router.navigate([`/Entry/by-member/${member.firstEntry.memberId}`], { state: { member: member } });
  }

  goToViolationPage(player: any, violationType: string) {
    this._Router.navigate(['/violation-details'], {
      state: { player, violationType }
    });
  }


}
