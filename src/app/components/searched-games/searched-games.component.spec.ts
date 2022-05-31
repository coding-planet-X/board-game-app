import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedGamesComponent } from './searched-games.component';

describe('SearchedGamesComponent', () => {
  let component: SearchedGamesComponent;
  let fixture: ComponentFixture<SearchedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
