import { Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AppUser } from '../../../types/user.type';
import { AppRoutesService } from '../../../services/app.route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-app-main-layout',
  templateUrl: './app-main-layout.component.html',
  styleUrl: './app-main-layout.component.scss',
})
export class AppMainLayoutComponent implements OnInit {
  private isStudentCardRegistered = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  showMenu = computed(() => !this.isLoading() && this.isStudentCardRegistered());

  constructor(
    private readonly authService: AuthService,
    private readonly destroyRef: DestroyRef,
    private readonly appRoutesService: AppRoutesService,
    private readonly router: Router
  ){}
  
  ngOnInit(): void {
    const authSubscription = this.authService.auth()
      .subscribe({
        next: (user) => this.handleAuth(user),
      });

    this.destroyRef.onDestroy(() => authSubscription.unsubscribe());
  }

  handleAuth(user: AppUser){
    this.isLoading.set(false);

    if (!user.isStudentCardRegistered){
      this.router.navigate(this.appRoutesService.studentIdSetupUrl);
    } else {
      this.isStudentCardRegistered.set(true);
    }
  }
}
