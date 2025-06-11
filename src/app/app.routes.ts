
import { Routes } from '@angular/router';
import { StadiumComponent } from './Components/stadium/stadium.component';
import { StartComponent } from './Components/start/start.component';
import { InjuryComponent } from './Components/injury/injury.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { StadiumLogComponent } from './Components/stadium-log/stadium-log.component';
import { ViolationDetailsComponent } from './Components/violation-details/violation-details.component';
import { ViolationHistoryComponent } from './Components/violation-history/violation-history.component';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'controlInfo' },
    { path: 'enterStadium', component: StadiumComponent },
    { path: 'violation/:id/:type', component: ViolationDetailsComponent },
    { path: "violation-history", component: ViolationHistoryComponent },
    { path: 'controlInfo', component: StartComponent },
    { path: 'injury', component: InjuryComponent },
    { path: 'stadiumLog', component: StadiumLogComponent },
    { path: '**', component: NotFoundComponent }

];
