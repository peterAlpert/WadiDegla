
import { Routes } from '@angular/router';
import { StadiumComponent } from './Components/stadium/stadium.component';
import { StartComponent } from './Components/start/start.component';
import { InjuryComponent } from './Components/injury/injury.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { StadiumLogComponent } from './Components/stadium-log/stadium-log.component';
import { ViolationDetailsComponent } from './Components/violation-details/violation-details.component';
import { ViolationHistoryComponent } from './Components/violation-history/violation-history.component';
import { EntryLogComponent } from './Components/entry-log/entry-log.component';
import { EntryHistoryComponent } from './Components/entry-history/entry-history.component';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingTodayComponent } from './Components/booking-today/booking-today.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'controlInfo' },
    { path: 'enterStadium', component: StadiumComponent },
    { path: 'violation-details', component: ViolationDetailsComponent },
    { path: "violation-history", component: ViolationHistoryComponent },
    // { path: 'controlInfo', component: StartComponent, canActivate: [authGuard] },
    { path: 'controlInfo', component: StartComponent },

    { path: 'injury', component: InjuryComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'today-bookings', component: BookingTodayComponent },
    { path: 'entry-log', component: EntryLogComponent },
    { path: 'Entry/by-member/:memberId', component: EntryHistoryComponent },
    { path: 'stadiumLog', component: StadiumLogComponent },
    { path: '**', component: NotFoundComponent }

];
