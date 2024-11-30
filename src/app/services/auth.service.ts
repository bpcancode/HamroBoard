import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null);

  constructor(private router: Router, private ngZone: NgZone) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session!.user);
      } else {
        this._currentUser.next(false);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/', { replaceUrl: true });
        });
      }
    });
  }

  async init() {
    const user = await this.supabase.auth.getUser();
    this._currentUser.next(user || false);
  }

  signInWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({
      email,

      options: {
        emailRedirectTo: 'http://hamro-board.vercel.app',
      },
    });
  }

  logout() {
    this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}
