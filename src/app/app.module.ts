import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';

import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotComponent } from './plot/plot.component';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    PlotComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    CommonModule, 
    PlotlyModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '71502fba-06fa-4ccc-b3da-954f77768a08',
        authority: 'https://login.microsoftonline.com/38ea53fb-9117-4764-adc6-31f828910b30',
        redirectUri: 'https://localhost:8080/'
      },
      cache: {
        cacheLocation: 'localStorage',
        // storeAuthStateInCookie: isIE, 
      }
    }),{
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['openid', 'profile', 'Group.ReadWrite.All']
        }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ['openid', 'profile', 'Group.ReadWrite.All']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
