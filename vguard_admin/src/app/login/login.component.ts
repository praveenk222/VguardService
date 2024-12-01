import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private users:UsersService,private spinner:NgxSpinnerService,
    private salert:SweetAlertServiceService
  ) {
    this.loginForm = this.fb.group({
      UserName: ['admin', ],
      Password: ['admin', [Validators.required]]
    });
  }

  onSubmit() {
this.spinner.show();
    if (this.loginForm.valid) {
      // Handle login logic here
      this.users.loginAdmin(this.loginForm.value).subscribe(
        res=>{
          console.log(res)
          if(res){
            this.salert.showSuccess('Login done','')
            console.log(res.Permissions);
            this.router.navigate(['/dashboard'])
          }
          },
          (error)=>{
            this.spinner.hide();
            this.salert.showFailure('Login failed')
        }
      )
    }
  }
}
