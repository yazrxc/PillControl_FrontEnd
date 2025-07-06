import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { JwtRequest } from '../../../models/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  mensaje: string = '';

  login() {
    if (this.form.invalid) {
      this.snackBar.open('Formulario inválido', 'Aviso', { duration: 2000 });
      return;
    }

    const request = new JwtRequest();
    request.username = this.form.value.usuario;
    request.password = this.form.value.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['farmacias']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
    this.form.reset();
  }
}
