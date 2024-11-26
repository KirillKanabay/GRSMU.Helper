import { Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AppUser } from '../../../types/user.type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isLoading = signal<boolean>(true);
  showMenu = computed(() => !this.isLoading());

  constructor(
    private readonly authService: AuthService,
    private readonly destroyRef: DestroyRef){}
  
  ngOnInit(): void {
    const authSubscription = this.authService.auth()
      .subscribe({
        next: this.handleAuth.bind(this),
      });

    this.destroyRef.onDestroy(() => authSubscription.unsubscribe());
  }

  handleAuth(user: AppUser){
    //this.isLoading.set(false);

    if (user.isStudentCardRegistered){
      console.log('hello world!')
      // this.router.navigate(AppRoutesService.studentIdSetupUrl);
    }
  }
}
