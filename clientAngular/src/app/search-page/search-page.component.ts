import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Movie } from '../model/Movie';
import { HTTPService } from '../service/HTTPService';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})


export class SearchPageComponent {

  public searchForm: FormGroup = new FormGroup({
    keywords: new FormControl('')
  });

  @ViewChildren('footer')
  children!: QueryList<ElementRef>;
  infiniteScroll:IntersectionObserver


  results: Array<Movie> = [];

  constructor( private router: Router, private route: ActivatedRoute,  private httpService:HTTPService) {
    this.infiniteScroll = new IntersectionObserver( this.infiniteScrollHandler.bind(this));
  }

  ngOnInit() {
    
    

    this.httpService.searchResult$.subscribe(
      {
        next: (response) => {
          response.result.forEach(elt => {
            if (elt.poster_path == null) elt.poster_path = "https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png";
            else elt.poster_path = "https://image.tmdb.org/t/p/original/" + elt.poster_path;
          });
          this.results = response.result;
         
      },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );

    this.httpService.nextPage$.subscribe(
      {
        next: (v) => {
          v.forEach((elt: { poster_path: string | null; }) => {
            if (elt.poster_path == null) elt.poster_path = "https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png";
            else elt.poster_path = "https://image.tmdb.org/t/p/original/" + elt.poster_path;
          });
          
          this.results = this.results.concat(v);
          
       
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }

    );

    /*
    *   mise en corrélation des param url et du composant 
    */
    this.route.queryParams.subscribe(params => {
       
      if(params["keywords"]!= undefined && params["keywords"]!= "")
      {
        this.searchForm.controls['keywords'].setValue(params["keywords"]);
        this.httpService.searchMoviesByKeywords(this.searchForm.controls['keywords'].value);
      }
    }
  );
  }


  ngAfterViewInit():void{
    this.infiniteScroll.observe(this.children.last.nativeElement);
   }
 

  /*
  *   callback de saisi dans le champs de recheche 
  */ 
  public onKeyUp(): void {

    this.bindURLParams();
    this.httpService.searchMoviesByKeywords(this.searchForm.controls['keywords'].value);

  }

  /**
   *  Lie le champs de recheche u parametre keywords de l'url
   **/
  bindURLParams():void{
    const queryParams: Params = { keywords: this.searchForm.controls['keywords'].value };
  
    this.router.navigate( [] ,  { relativeTo: this.route, queryParams, 
                                  queryParamsHandling: 'merge'
                                }
    );

  }


  private infiniteScrollHandler(entries:IntersectionObserverEntry[]): void
  {
    if (entries[0].intersectionRatio <= 0
         || !this.httpService.pagination.hasNext()
       ) return;

    this.httpService.loadNextPage();
  } 


}