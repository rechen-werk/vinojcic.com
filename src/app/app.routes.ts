import {Routes} from '@angular/router';
import {HomeComponent} from "./routes/home/home.component";
import {NotFoundComponent} from "./routes/not-found/not-found.component";
import {ContactComponent} from "./routes/contact/contact.component";
import {CropComponent} from "./routes/crop/crop.component";

export const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'crop', component: CropComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];
