import {Routes} from '@angular/router';
import {BachelorThesisComponent} from "./routes/bachelor-thesis/bachelor-thesis.component";
import {HomeComponent} from "./routes/home/home.component";

export const routes: Routes = [
  {path: 'bachelor-thesis', component: BachelorThesisComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''},
];
