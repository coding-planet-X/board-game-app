import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from './../../interfaces/game';
import { GameService } from './../../services/game.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { ListType } from './../../enums/list-type';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-searched-games',
  templateUrl: './searched-games.component.html',
  styleUrls: ['./searched-games.component.scss']
})
export class SearchedGamesComponent implements OnInit {
  
  @Input() searchText: string|undefined;
  @Input() games: Game[] = [];
  @Input() ownedGames: {[id: string]: Game} = {};
  @Input() wishListGames: {[id: string]: Game} = {};
  @Output() searchy = new EventEmitter<string>();
  dataSource!:any;
  displayedColumns = ['test'];  
  constructor(
    private router: Router,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
    
  }
    getSearch(){
      if(this.searchText!=undefined){
        this.gameService.searchByName(this.searchText).subscribe(games => this.games = games);
      }
    }
updateOwnedList(event: MouseEvent, game: Game) {
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
}
goToGameDetails(game: Game) {
  this.router.navigate(['./game-details', { gameId: game.id }]);
}
}

