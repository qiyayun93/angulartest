import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { TokenCredentialAuthenticationProvider, TokenCredentialAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { AuthenticationResult } from '@azure/msal-browser';
import { Client,AuthProvider } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'my-app';
  profile: any | null = null;
  constructor(
    private authService: MsalService,
    private http: HttpClient,
    
    ) { 
    this.authService.instance.handleRedirectPromise().then((result)=>{this.profile = result})
      
    }
  ngOnInit() {
      this.login();
    }

  login() {
    // this.authService.loginPopup()
    //   .subscribe({
    //     next: (result) => {
    //       console.log(result);
    //     },
    //     error: (error) => console.log(error)
    //   });
    try{
      this.authService.loginRedirect({
        scopes: ['Group.ReadWrite.All', "openid", "profile"]
      })
  
    }   
    catch(err){
      console.log('sef')
    }  


  };

  async gettoken() {
    // try
    // {this.profile = await this.authService.instance.handleRedirectPromise();}
    // catch (err)
    // {
    //   console.log('sfe')
    // }
    console.log(this.profile.accessToken)
    const graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        done(null,this.profile.accessToken);

        
      },
    });    
    const res = await graphClient.api("https://graph.microsoft.com/v1.0/me/transitiveMemberOf/microsoft.graph.group?$count=true").get();  
    console.log(res)

    // const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";
    // await this.http.get(graphMeEndpoint).toPromise()
    // .then(profile => {
    //   this.profile = profile;
    //   console.log(profile)
    // });

    // const requestObj = {
    //   scopes: ['openid']
    // };
    // await this.authService.acquireTokenSilent(requestObj).toPromise().then(tokenResponse=>{console.log(tokenResponse.accessToken)}
    //   // Callback code here
      
    // ).catch(function (error) {
    //     console.log(error);
    // });


  }

  
}

