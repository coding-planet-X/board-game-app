import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedGamesComponent } from './recomended-games.component';

describe('RecomendedGamesComponent', () => {
  let component: RecomendedGamesComponent;
  let fixture: ComponentFixture<RecomendedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
