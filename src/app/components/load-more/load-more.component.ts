import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Output() newText=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  load(cool?:string){

  }

}
