import { Movie } from "./Movie"

export interface ResultDataset {
  page:number,
  result: Array<Movie>,
  total_pages: number, 
  total_results: number
}