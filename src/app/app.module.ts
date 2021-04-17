import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { ArticleService } from './article.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TorsoComponent } from './torso/torso.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { ContributeComponent } from './contribute/contribute.component'
import { QuillModule} from 'ngx-quill';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AuthGuard } from './auth.guard';
import { UnknownComponentComponent } from './unknown-component/unknown-component.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { AskComponent } from './ask/ask.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

import {TooltipModule} from 'primeng/tooltip';
import { SponcersComponent } from './sponcers/sponcers.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';

import {NgxPaginationModule} from 'ngx-pagination';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { UserService } from './user.service';
import { LoginService } from './core/authentication/login.service';
import {DialogModule} from 'primeng/dialog';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SpecialEventsComponent,
    NavbarComponent,
    HomeComponent,
    TorsoComponent,
    FooterComponent,
    ArticlesComponent,
    ContributeComponent,
    UnknownComponentComponent,
    DiscussionsComponent,
    AskComponent,
    MyArticlesComponent,
    ArticleDetailComponent,
    SponcersComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    QuillModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    NgxTagsInputModule,
    ToastModule,
    TooltipModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [MessageService, AuthService, AuthGuard, ArticleService, UserService, LoginService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
