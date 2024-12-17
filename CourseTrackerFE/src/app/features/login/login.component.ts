import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { LoginService } from '../../api/services';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    mat-drawer-container {
      display: block;
      height: 100%;
      ::ng-deep {
        .mat-drawer-content {
          display: flex;
          height: 100%;
        }
      }
    }
    form {
      margin: auto;
    }
    mat-card {
      width: 40vw;
      padding: 16px;
    }
  `,
  template: `
    <mat-drawer-container>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-card>
          <mat-form-field>
            <mat-label>Username</mat-label>
            <input matInput formControlName="username"/>
          </mat-form-field>
    
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password"/>
          </mat-form-field>
    
          <button mat-button >Login</button>
        </mat-card>
      </form>
    </mat-drawer-container>
  `,
})
export class LoginComponent {
  private _api = inject(LoginService);
  private _authSrv = inject(AuthService);
  private _router = inject(Router);

  form = inject(FormBuilder).group({
    username: [],
    password: [],
  });

  onSubmit() {
    this._api.apiLoginPost$Json({body: this.form.value}).subscribe(res => {
      this._authSrv.setToken(res);
      this._router.navigate(['']);
    });
  }
}
