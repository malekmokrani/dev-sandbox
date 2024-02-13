import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';
import { ResultDataset } from '../model/ResultDataset';
import { Movie } from '../model/Movie';
import { Pagination } from './Pagination';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class HTTPService {



    private urlBase: string =environment.apiUrl;

    public input$: Subject<any> = new Subject();
    public nextPage$: Subject<any> = new Subject();
    public searchResult$: Observable<ResultDataset>;
    
    private query: string = "";
   
    

    constructor(private http: HttpClient, public pagination:Pagination) {
        this.searchResult$ = this.input$.pipe(debounceTime(500), distinctUntilChanged(), mergeMap(entry => this.getResult$(entry)));
        this.searchResult$.subscribe({
          next: (response) => {
            this.pagination.setValues( response.page, response.total_pages, response.total_results);
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        });

      
       
       
    }


  private getResult$ (keywords: string, page: number = 1): Observable<ResultDataset> {
   
    const query = encodeURI(keywords);
    return this.http.get<any>(`${this.urlBase}/search/${query}?page=${page}`);
  }


    public searchMoviesByKeywords(query: string):void {
        this.query = query;
        this.input$.next(query);
    }

    public getMovie$(id:string): Observable<Movie>
    {
      return this.http.get<Movie>(`${this.urlBase}/movie/${id}`,{headers: new HttpHeaders( {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'} ) } );
    }

    loadNextPage() {
    
      this.getResult$(this.query, this.pagination.getNextPage()).subscribe({
        next:(response) => {        
          this.pagination.setValues(response.page, response.total_pages, response.total_results);
          this.nextPage$.next(response.result);
        } ,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
      
    }

}

