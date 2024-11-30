import { Component, computed, DestroyRef, OnInit, signal } from "@angular/core";
import { UserService } from "../../../../services/user.service";
import { AppRoutesService } from "../../../../services/app.route.service";
import { Router } from "@angular/router";
import { UserModel } from "../../../../api/user/types/user.model";

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
    const userRefreshSubscription = this.userService.refreshUser()
      .subscribe({
        next: (user) => {
          userRefreshSubscription.unsubscribe();
        },
        error: (err) => {
          userRefreshSubscription.unsubscribe();
          console.error(err);
          this.isLoading.set(false);
          this.router.navigate(this.appRoutesService.fatalErrorUrl);
        },
      });
    
    const userSubscription = this.userService.user.subscribe((user) => this.handleUserChange(user))

    this.destroyRef.onDestroy(() => userSubscription.unsubscribe());
  }

  handleUserChange(user: UserModel | null){
    if(!user){
      return;
    }

    this.isLoading.set(false);

    if (!user.isStudentCardRegistered){
      this.router.navigate(this.appRoutesService.studentIdSetupUrl);
    } else {
      this.isStudentCardRegistered.set(true);
    }
  }
}
