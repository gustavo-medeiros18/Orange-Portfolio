import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './screens/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './screens/register/register.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ProjectCardComponent } from './componentes/project-card/project-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { ModalActionComponent } from './componentes/modal-action/modal-action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { ProjectActionComponent } from './componentes/project-action/project-action.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavBarComponent,
    ProjectCardComponent,
    ModalActionComponent,
    ProjectActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    HttpClientModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
