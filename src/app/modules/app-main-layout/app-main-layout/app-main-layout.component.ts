import { Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { AppRoutesService } from '../../../services/app.route.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../types/user/user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './app-main-layout.component.html',
  styleUrl: './app-main-layout.component.scss',
})
export class AppMainLayoutComponent implements OnInit {
  private isStudentCardRegistered = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  showMenu = computed(() => !this.isLoading() && this.isStudentCardRegistered());

  constructor(
    private readonly userService: UserService,
    private readonly destroyRef: DestroyRef,
    private readonly appRoutesService: AppRoutesService,
    private readonly router: Router
  ){}
  
  ngOnInit(): void {
    const userSubscription = this.userService.getUserInfo()
      .subscribe({
        next: (user) => this.handleAuth(user),
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
          this.router.navigate(this.appRoutesService.fatalErrorUrl);
        },
      });

    this.destroyRef.onDestroy(() => userSubscription.unsubscribe());
  }

  handleAuth(user: UserModel){
    this.isLoading.set(false);

    if (!user.isStudentCardRegistered){
      this.router.navigate(this.appRoutesService.studentIdSetupUrl);
    } else {
      this.isStudentCardRegistered.set(true);
    }
  }
}
