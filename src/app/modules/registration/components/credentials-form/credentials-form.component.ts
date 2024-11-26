import { Component, computed, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { StudentIdCredentialsModel } from '../../types/student-id-credentials.model';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrl: './credentials-form.component.scss'
})
export class CredentialsFormComponent {
  public isSubmitting = input(false);
  public externalErrorMessages = input<string[]>([]);

  public submit = output<StudentIdCredentialsModel>();
  
  public form = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^\d{2}-\d{5}$/)]
    })
  });

  public errors = computed(() => this.externalErrorMessages().map(msg => ({
    severity: 'error',
    detail: msg
  })));

  public onSubmit() {
    if(this.form.invalid){
      return;
    }

    this.submit.emit({
      login: this.form.value.login!,
      password: this.form.value.password!
    })
  }
}
