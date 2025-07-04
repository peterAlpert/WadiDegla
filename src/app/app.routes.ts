
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
import { AuthGuard } from './auth.guard';
import { PrivateBookingComponent } from './Components/private-booking/private-booking.component';
import { PrivateBookingsTodayComponent } from './Components/private-bookings-today/private-bookings-today.component';


export const routes: Routes = [
    //{ path: '', pathMatch: 'full', redirectTo: 'controlInfo' },
    { path: 'enterStadium', component: StadiumComponent, canActivate: [AuthGuard] },
    { path: 'violation-details', component: ViolationDetailsComponent, canActivate: [AuthGuard] },
    { path: "violation-history", component: ViolationHistoryComponent, canActivate: [AuthGuard] },
    { path: 'controlInfo', component: StartComponent, canActivate: [AuthGuard] },

    { path: 'injury', component: InjuryComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'today-bookings', component: BookingTodayComponent, canActivate: [AuthGuard] },
    { path: 'private-booking', component: PrivateBookingComponent, canActivate: [AuthGuard] },
    { path: 'private-bookings-today', component: PrivateBookingsTodayComponent, canActivate: [AuthGuard] },
    { path: 'entry-log', component: EntryLogComponent, canActivate: [AuthGuard] },
    { path: 'Entry/by-member/:memberId', component: EntryHistoryComponent, canActivate: [AuthGuard] },
    { path: 'stadiumLog', component: StadiumLogComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }

];
