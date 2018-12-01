import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;
    constructor(private authService: AuthService, private router: Router) {
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
}
