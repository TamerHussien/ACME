import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;
    constructor(public authService: AuthService, private router: Router, public messageService: MessageService) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouteEvent(routerEvent);
        });
    }

    checkRouteEvent(RouterEvent: Event) {
        if (RouterEvent instanceof NavigationStart) {
            this.loading = true;
        }
        if (RouterEvent instanceof NavigationEnd || RouterEvent instanceof NavigationCancel || RouterEvent instanceof NavigationError) {
            this.loading = false;
        }
    }
    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
        console.log('Log out');
    }

    displayMessages(): void {
        this.router.navigate([{outlets : {popup : ['messages']}}] ,
        { skipLocationChange: true });
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.router.navigate([{outlets : {popup : null}}] );
        this.messageService.isDisplayed = false;
    }
}
