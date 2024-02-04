import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./screens/login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RegisterComponent } from "./screens/register/register.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./componentes/nav-bar/nav-bar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { ProjectCardComponent } from "./componentes/project-card/project-card.component";
import { MatChipsModule } from "@angular/material/chips";
import { ModalActionComponent } from "./componentes/modal-action/modal-action.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { ProjectActionComponent } from "./componentes/project-action/project-action.component";
import { DeleteConfirmationComponent } from "./componentes/delete-confirmation/delete-confirmation.component";
import { ViewProjectInfoComponent } from "./componentes/view-project-info/view-project-info.component";
import { DiscoverComponent } from "./screens/discover/discover.component";
import { ViewProjectMobileComponent } from "./screens/view-project-mobile/view-project-mobile.component";
import { NotFoundComponent } from "./screens/not-found/not-found.component";
import { LoginGoogleComponent } from "./componentes/login-google/login-google.component";
import { ProfileInfoComponent } from "./screens/profile-info/profile-info.component";
import { AuthorizationInterceptorService } from "../app/interceptors/authorization-interceptor.service";
import { ProfileActionComponent } from "./componentes/profile-action/profile-action.component";
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavBarComponent,
    ProjectCardComponent,
    ModalActionComponent,
    ProjectActionComponent,
    DeleteConfirmationComponent,
    ViewProjectInfoComponent,
    DiscoverComponent,
    ViewProjectMobileComponent,
    LoginGoogleComponent,
    NotFoundComponent,
    ProfileInfoComponent,
    ProfileActionComponent,
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
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectCountryModule.forRoot('br'),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
