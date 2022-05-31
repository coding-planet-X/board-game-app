import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from './../../interfaces/game';
import {Categories} from '../../interfaces/categories';
import { GameService } from './../../services/game.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { ListType } from './../../enums/list-type';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-recomended-games',
  templateUrl: './recomended-games.component.html',
  styleUrls: ['./recomended-games.component.scss']
})
export class RecomendedGamesComponent implements OnInit {
  
  @Input() searchText: string|undefined;
  @Input() games: Game[] = [];
  @Input() ogames: Game[] = [];
  @Input() agames: Game[] = [];
  @Input() ownedGames: {[id: string]: Game} = {};
  @Input() wishListGames: {[id: string]: Game} = {};
  @Output() searchy = new EventEmitter<string>();
  catman!:boolean;
  firstLoad!:boolean;
  loadCount!:number;
  cat:string|undefined;
  dataSource!:any;
  prevNext:'next'|'prev'|undefined
  displayedColumns = ['test']; 
  fullLoad!:boolean;
  foods:Categories[]= this.cateServ.getCat()
  constructor(
    private router: Router,
    private gameService: GameService,
    private cateServ:CategoriesService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
    this.gameService.getByRank('rank').subscribe(games => this.games = games);
    
    this.prevNext= undefined
    this.loadCount=0
    this.firstLoad=true
    this.fullLoad=true
    this.cat="2bdFPJUvFo"
    
    this.gameService.getCateRank(this.cat).subscribe(games => this.ogames = games);
    if(this.ogames.length < 100){
      this.fullLoad=false
      
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
selectedCat(cat:string){
  this.cat =cat
  this.gameService.getCateRank(this.cat).subscribe(games => this.ogames = games);
  if(this.ogames.length ==100){}
}
nextPage(){
  if(this.cat != undefined){
  this.loadCount+=1;  
  this.firstLoad=false
  this.gameService.getNextPage(this.cat).subscribe(games => this.ogames = games);
  if(this.ogames.length<100){
    this.fullLoad=false
  }   
}}
prevPage(){
  this.loadCount-=1;
  this.fullLoad =true
  if(this.cat != undefined){  
    if(this.loadCount<=0){
      this.loadCount=0
      this.firstLoad=true
    }
  this.gameService.getPrevPage(this.cat).subscribe(games => this.ogames = games);
  console.log(this.gameService)
}}

loadNextPage(){
  this.prevNext='next';
}
loadPrevPage(){
  this.prevNext='prev';
}
pageButton(){
  if(this.prevNext=='next'){
    this.nextPage()
  }
  else if(this.prevNext =='prev'){
    this.prevPage()
  }
  else{
    console.log("error")
  }

}
}
