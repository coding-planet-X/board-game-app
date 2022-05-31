import { Component, OnInit } from '@angular/core';
import { Game } from './../../interfaces/game';
import { GameService } from './../../services/game.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { ListType } from './../../enums/list-type';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit {
  searchText: string |undefined;
  returned!: string; 
  games: Game[] = [];
  ownedGames: {[id: string]: Game} = {};
  wishListGames: {[id: string]: Game} = {};
  boolman!: boolean;
  constructor(
    private router: Router,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
    
  ) { 

  }

  ngOnInit(): void {
    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
    
    this.boolman = false
  }
  
  search() {
  
    if(this.searchText!=undefined){
      if(this.searchText !=""){
        this.gameService.searchByName(this.searchText).subscribe(games => this.games = games);
        this.boolman = true
        console.log(this.boolman)
      }
      else{
        this.gameService.searchByName("").subscribe(games => this.games = games)
        this.boolman = false
        console.log(this.boolman)
      }
        
    }
    else{
      this.gameService.searchByName("").subscribe(games => this.games = games)
      this.boolman = false
      console.log(this.boolman)
    }

    
}
/*updateOwnedList(event: MouseEvent, game: Game) {
  event.stopPropagation();

  if (this.ownedGames[game.id]) {
      this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
  } else {
      if (this.wishListGames[game.id]) {
          this.localStorageService.deleteGame(game, ListType.WISHLIST);
      }
      this.localStorageService.saveGame(game, ListType.OWNEDLIST);
  }
}

updateWishlist(event: MouseEvent, game: Game) {
  event.stopPropagation();

  if (this.wishListGames[game.id]) {
      this.localStorageService.deleteGame(game, ListType.WISHLIST);
  } else {
      if (this.ownedGames[game.id]) {
          this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
      }
      this.localStorageService.saveGame(game, ListType.WISHLIST);
  }
}*/
goToGameDetails(game: Game) {
  this.router.navigate(['./game-details', { gameId: game.id }]);
}
}
