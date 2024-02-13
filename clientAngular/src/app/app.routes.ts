import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    { path: '', component: SearchPageComponent },
    { path: 'movie/:id', component: DetailsComponent } 
];
