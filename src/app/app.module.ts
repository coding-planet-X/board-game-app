import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './modules/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailControlsComponent } from './components/game-detail-controls/game-detail-controls.component';
import { UserSelectionsComponent } from './components/user-selections/user-selections.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchedGamesComponent } from './components/searched-games/searched-games.component';
import { RecomendedGamesComponent } from './components/recomended-games/recomended-games.component';
import { SelectCatComponent } from './components/select-cat/select-cat.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { environment} from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FlexLayoutModule } from '@angular/flex-layout';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    GameSearchComponent,
    GameDetailsComponent,
    GameDetailControlsComponent,
    UserSelectionsComponent,
    SearchedGamesComponent,
    RecomendedGamesComponent,
    SelectCatComponent,
    LoadMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // <-- add this
    AngularFirestoreModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
