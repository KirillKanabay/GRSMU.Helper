import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationRoutes } from './registration.route';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { LayoutComponent } from './components/layout/layout.component';
import { StepStageComponent } from './components/step-stage/step-stage.component';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';

@NgModule({
  declarations: [
    LayoutComponent,
    StepStageComponent,
    CredentialsFormComponent
  ],
  imports: [
    RouterModule.forChild(RegistrationRoutes),
    StepperModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    CommonModule,
    ReactiveFormsModule,
    MessagesModule
  ]
})
export class RegistrationModule { }
