import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import {MDBSpinningPreloader, DropdownModule } from 'ng-uikit-pro-standard';
import {AgmCoreModule} from '@agm/core';
import { Angular4PaystackModule } from 'angular4-paystack';

import { ToastModule, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { SlidesComponent } from './components/slides/slides.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturedImageComponent } from './components/featured-image/featured-image.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { FeaturesComponent } from './components/features/features.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AllproductsComponent } from './pages/allproducts/allproducts.component';
import { CategoryproductsComponent } from './pages/categoryproducts/categoryproducts.component';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { NavbarComponent } from 'ng-uikit-pro-standard';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { HelpComponent } from './pages/help/help.component';
import { ContactComponent } from './pages/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    CopyrightComponent,
    SlidesComponent,
    HomeComponent,
    FeaturedImageComponent,
    FeaturedProductComponent,
    ShopComponent,
    FeaturesComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
    AllproductsComponent,
    CategoryproductsComponent,
    PrivacyComponent,
    TermsComponent,
    ReturnsComponent,
    HelpComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    DropdownModule,
    Angular4PaystackModule.forRoot('pk_test_aff83a12bc9631dc681b9ea7f9ce8a9d9ee7969a'),
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
        apiKey: 'your key here'
    }),
  ],
  providers: [
    MDBSpinningPreloader,
    ModalDirective,
    NavbarComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
 