import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { map, Observable, pipe, startWith, tap } from 'rxjs';
import { validValidator } from '../../validators/valid.validator';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public personalInfosForm!: FormGroup

  public contactPreferenceCtrl!: FormControl

  public emailForm!: FormGroup
  public emailCtrl!: FormControl
  public confirmEmailCtrl!: FormControl

  public phoneCtrl!: FormControl

  public loginInfosForm!: FormGroup
  public passwordCtrl!: FormControl
  public confirmPasswordCtrl!: FormControl

  public mainForm!: FormGroup

  public showEmailCtrl$!: Observable<boolean>

  public showPhoneCtrl$!: Observable<boolean>

  public loading = false

  public showEmailError$!: Observable<boolean>

  public showPasswordError$!: Observable<boolean>


  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.initFormObservables()
  }

  private initMainForm = () => {
    this.mainForm = this.formBuilder.group({
      personalInfos : this.personalInfosForm,
      contactPreference : this.contactPreferenceCtrl,
      email : this.emailForm,
      phone : this.phoneCtrl,
      loginInfos : this.loginInfosForm,
    })
  }

  private initFormControls = () => {

    this.personalInfosForm = this.formBuilder.group({
      firstname : ['Jonh', [
        Validators.required/* , validValidator() */
      ]],
      lastname : ['DOE', [
        Validators.required
      ]],
    })

    this.contactPreferenceCtrl = this.formBuilder.control('email')

    this.emailCtrl = this.formBuilder.control('')
    this.confirmEmailCtrl = this.formBuilder.control('')
    this.emailForm = this.formBuilder.group({
      email : this.emailCtrl,
      confirmEmail : this.confirmEmailCtrl,
    }, {
      validators : [
        confirmEqualValidator('email', 'confirmEmail')
      ],
      updatedOn : 'blur'
    })

    this.phoneCtrl = this.formBuilder.control('')

    this.passwordCtrl = this.formBuilder.control('', [
      Validators.required
    ])
    this.confirmPasswordCtrl = this.formBuilder.control('', [
      Validators.required
    ])
    this.loginInfosForm = this.formBuilder.group({
      username : ['doejonh', [
        Validators.required
      ]],
      password : this.passwordCtrl,
      confirmPassword : this.confirmPasswordCtrl,
    }, {
      validators : [
        confirmEqualValidator('password', 'confirmPassword')
      ],
      updatedOn : 'blur'
    })

  }

  private initFormObservables = () => {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'email'),
      tap((showEmailCtrl) => {
        this.setEmailValidators(showEmailCtrl)
      })
    )

    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'phone'),
      tap((showPhoneCtrl) => {
        this.setPhoneValidators(showPhoneCtrl)
      })
    )

    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map((status) =>
        status === 'INVALID' &&
        this.emailCtrl.value &&
        this.confirmEmailCtrl.value
      )
    )

    this.showPasswordError$ = this.loginInfosForm.statusChanges.pipe(
      map((status) =>
        status === 'INVALID' &&
        this.passwordCtrl.value &&
        this.confirmPasswordCtrl.value
      )
    )
  }

  private setEmailValidators = (showEmailCtrl : boolean) => {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([
        Validators.required, Validators.email
      ])
      this.confirmEmailCtrl.addValidators([
        Validators.required, Validators.email
      ])
    }
    else {
      this.emailCtrl.clearValidators()
      this.confirmEmailCtrl.clearValidators()
    }
    this.emailCtrl.updateValueAndValidity()
    this.confirmEmailCtrl.updateValueAndValidity()
  }

  private setPhoneValidators = (showPhoneCtrl : boolean) => {
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(8), Validators.maxLength(10)
      ])
    }
    else {
      this.phoneCtrl.clearValidators()
    }
    this.phoneCtrl.updateValueAndValidity()
  }

  public getFormControlText (ctrl: AbstractControl) : string {
    if (ctrl.hasError('required')) return "Ce champ est requis !"
    if (ctrl.hasError('email')) return "Entrez une adresse mail valide !"
    if (ctrl.hasError('minlength') || ctrl.hasError('maxlength')) return "Entrez un numéro valide !"
    if (ctrl.hasError('validValidator')) return "Ce champ ne contient pas le mot clé VALID !"
    else return "Ce champ contient une erreur !"
  }

  public onSubmitForm () : void {
    this.loading = true
    if (this.mainForm.valid) {
      console.log(this.mainForm.value)
      this.authService.testRegister(this.mainForm.value).pipe(
        tap((saved) => {
          if (saved) {
            console.log("Enrégistrment éffectué avec succès")
            this.mainForm.reset()
            this.contactPreferenceCtrl.patchValue('email')
          }
          else {
            console.log("Une erreur s'est produite")
          }
          this.loading = false
        })
      ).subscribe()
    }
  }

}
