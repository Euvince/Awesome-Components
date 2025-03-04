
export class Register {

  public personalInfos!: {
    firstname: string,
    lastname: string,
  }
  public contactPreference!: string
  emailForm?: {
    email: string,
    confirmEmail: string
  }
  public phone?: string
  public loginInfos!: {
    username: string,
    password: string,
    confirmPassword: string
  }

  /* public constructor (
    public personalInfos: {
      firstname: string,
      lastname: string,
    },
    public contactPreference: string,
    emailForm: {
      email: string,
      confirmEmail: string
    },
    public phone: string,
    public loginInfos: {
      username: string,
      password: string,
      confirmPassword: string
    }
  ) {} */

}
