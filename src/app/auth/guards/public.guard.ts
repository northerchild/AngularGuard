import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, UrlSegment,Route, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.services';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
    constructor(
        private authService:AuthService,
        private router:Router) { 
    }

    private checkAuthStatus():boolean | Observable<boolean>{
        return this.authService.checkAuthentication()
        .pipe(
            tap( isAutthenticated => {
                if(isAutthenticated) {
                    this.router.navigate(['./heroes/list'])
                }
            }),
            map(isAutthenticated => !isAutthenticated)
        )
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>  {
        return this.checkAuthStatus()
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean > {
        return this.checkAuthStatus()
    }
    
}