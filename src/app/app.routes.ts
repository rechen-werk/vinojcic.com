import {Routes} from '@angular/router';
import {HomeComponent} from "./routes/home/home.component";
import {NotFoundComponent} from "./routes/not-found/not-found.component";
import {ContactComponent} from "./routes/contact/contact.component";
import {LoginComponent} from "./routes/login/login.component";
import {DashboardComponent} from "./routes/dashboard/dashboard.component";

export const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];
