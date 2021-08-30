import { Component } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly _destroying$ = new Subject<void>();

	constructor(private broadcastService: MsalBroadcastService) { }

	ngOnInit() {
		this.broadcastService.msalSubject$
		.pipe(
			filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
			takeUntil(this._destroying$)
		)
		.subscribe((result: EventMessage) => {
			// Do something with event payload here
		});
	}

	ngOnDestroy(): void {
		this._destroying$.next(undefined);
		this._destroying$.complete();
	}
  // title = 'my-app';
  // user: any | null = null;
  // constructor(private authService: MsalService) { }

  // async login() {
  //   // this.authService.loginRedirect()
  //   const requestObj = {
  //     clientId: '71502fba-06fa-4ccc-b3da-954f77768a08',
  //     authority: 'https://login.microsoftonline.com/38ea53fb-9117-4764-adc6-31f828910b30',
  //     redirectUri: 'https://localhost:8080/',
  //     scopes: ["user.read"]
  //   };
  
  //   this.authService.acquireTokenSilent(requestObj).subscribe(function (tokenResponse) {
  //     // Callback code here
  //     console.log(tokenResponse.accessToken);
  //     });
    // .subscribe({
      //   next: (result) => {
      //     console.log(result);
      //   },
      //   error: (error) => console.log(error)
      // });
}

