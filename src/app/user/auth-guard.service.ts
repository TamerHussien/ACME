import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()

export class AuthGuard implements CanActivate {
    constructor( private autService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        if (this.autService.isLoggedIn()) {
            return true;
        }
        this.autService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
    }
}
