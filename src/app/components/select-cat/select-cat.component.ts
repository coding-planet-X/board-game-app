

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Categories} from './../../interfaces/categories';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-select-cat',
  templateUrl: './select-cat.component.html',
  styleUrls: ['./select-cat.component.scss']
})
export class SelectCatComponent implements OnInit {
  @Output() newText=new EventEmitter<string>();
   cat:string|undefined;
  foods:Categories[]= this.cateServ.getCat()
  constructor(
    private cateServ: CategoriesService
  ) { }

  ngOnInit(): void {
  }
  selectCat(cat:string){
    this.newText.emit(cat);
  }

}
