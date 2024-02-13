import { Injectable } from "@angular/core";

 
 @Injectable({ providedIn: 'root' })
 export class Pagination{

  private _current:number = 0;
  private _total:number = 0;
  private _length:number = 0;

    constructor(){         }


        public hasNext():boolean{
         
            return this.current<this.total;
        }

        public getNextPage():number{
            return this.current+1 ; 
        }

        setValues(page: number, total_pages: number, total_results: number) 
        {
          this.current = page;
          this.total = total_pages,
          this.length = total_results;
        }


        get current():number{
          return this._current;
        }

        set current(value:number){
          this._current = value;
        }

        get total():number{
          return this._total;
        }

        set total(value:number){
          this._total = value;
        }

        get length():number{
          return this._length;
        }

        set length(value:number){
          this._length = value;
        }

 }