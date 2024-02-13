import { Component } from '@angular/core';
import { Movie } from '../model/Movie';
import { HTTPService } from '../service/HTTPService';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie: Movie | null = null;
  public id!: string | null;

  constructor(private route: ActivatedRoute, private httpService: HTTPService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => this.id = params.get('id'))

    if (this.id == null) throw Error("Movie id NULL");


    this.httpService.getMovie$(this.id).subscribe({
      next: (v) => {
     
        if (v.poster_path == null) v.poster_path = "https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png";
        else v.poster_path = "https://image.tmdb.org/t/p/original/" + v.poster_path;

        if (v.backdrop_path == null) v.backdrop_path = v.poster_path;
        else v.backdrop_path = "https://image.tmdb.org/t/p/original/" + v.backdrop_path;

        v.cast.forEach(elt => {
          if (elt.profile_path == null) elt.profile_path = "https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png";
          else elt.profile_path = "https://image.tmdb.org/t/p/original/" + elt.profile_path;
        });
        this.movie = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    }
    );
  }



}
