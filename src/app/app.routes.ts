import {Routes} from '@angular/router';
import {BachelorThesisComponent} from "./routes/bachelor-thesis/bachelor-thesis.component";
import {HomeComponent} from "./routes/home/home.component";
import {NotFoundComponent} from "./routes/not-found/not-found.component";
import {ContactComponent} from "./routes/contact/contact.component";

export const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'bachelor-thesis', component: BachelorThesisComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];
