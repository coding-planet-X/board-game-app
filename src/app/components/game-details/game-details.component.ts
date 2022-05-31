import { Component, OnInit } from '@angular/core';
import { GameService } from './../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../interfaces/game';
import { switchMap, tap } from 'rxjs';
import { LocalStorageService } from './../../services/local-storage.service';
import { ListType } from './../../enums/list-type';
import * as _ from 'lodash';
import {CategoriesService} from '../../services/categories.service';
import {Categories} from './../../interfaces/categories';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  category:Categories[]= this.cateServ.getCat()
  ownedGames: { [id: string]: Game } = {};
  wishListGames: { [id: string]: Game } = {};
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private  cateServ:CategoriesService,
  ) { }

  ngOnInit(): void {

      this.route.params.pipe(
        switchMap(params => {
          return this.gameService.getById(params['gameId'])
        }),
        tap(game => this.game = game[0])
      ).subscribe();

      this.localStorageService.getGameList(ListType.OWNEDLIST);
      this.localStorageService.getGameList(ListType.WISHLIST);


      this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
      this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
    }
    setGameList(listType: ListType) {
      if (listType === ListType.OWNEDLIST) {
          if (this.ownedGames[this.game.id]) {
              this.localStorageService.deleteGame(this.game, ListType.OWNEDLIST);
          } else {
              if (this.wishListGames[this.game.id]) {
                  this.localStorageService.deleteGame(this.game, ListType.WISHLIST);
              }
              this.localStorageService.saveGame(this.game, ListType.OWNEDLIST);
          }
      } else {
          if (this.wishListGames[this.game.id]) {
              this.localStorageService.deleteGame(this.game, ListType.WISHLIST);
          } else {
              if (this.ownedGames[this.game.id]) {
                  this.localStorageService.deleteGame(this.game, ListType.OWNEDLIST);
              }
              this.localStorageService.saveGame(this.game, ListType.WISHLIST);
          }
      }
  }
  getCats(cat:string){
    return (this.cateServ.getCatName(cat))
  }


}
