import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  skipper!:number;

  constructor(
    private http: HttpClient,
    
  ) {
    this.skipper = 0;
   }
  searchByName(searchText: string): Observable<Game[]> {
    const alteredText = searchText.replace(/\s/g, '+');
    return this.http.get<Game[]>(`https://api.boardgameatlas.com/api/search?name=${alteredText}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    )
  };
  getById(gameId: string): Observable<Game> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  };
  getByRank(rank:string): Observable<Game[]> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?order_by=${rank}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  }
  getCate(categories:string): Observable<Game[]> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?categories=${categories}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  }
  getCateRank(categories:string): Observable<Game[]> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?categories=${categories}&order_by=rank&limit=100&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  }
  testget(categories:string): Observable<Game[]> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );}
  getNextPage(categories:string): Observable<Game[]> {
    this.skipper+=100
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?categories=${categories}&order_by=rank&limit=100&skip=${this.skipper}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  }
  getPrevPage(categories:string): Observable<Game[]> {
    this.skipper-=100;
    if(this.skipper <=0){
      this.skipper=0;
    }
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?categories=${categories}&order_by=rank&limit=100&skip=${this.skipper}&client_id=${environment.boardgameAPI}`).pipe(
      map(response => response['games'])
    );
  }
}
