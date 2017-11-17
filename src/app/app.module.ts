import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LocationsComponent } from './locations/locations.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component'

import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { OrderService } from './services/order.service';
import { AuthGuard } from './guards/auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'menu/:location', component: UserMenuComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent/*, canActivate: [AuthGuard]*/ }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LocationsComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    MenuComponent,
    DialogComponent,
    UserMenuComponent,
    OrderSummaryComponent,
    PlaceOrderComponent,
    OrderFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbC0L2bN95HWWB-nyi-STqdqRT8gbL7ok'
    })
  ],
  providers: [
    AdminService,
    AuthService,
    MenuService,
    OrderService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
