class User {
  constructor(user: string, email: string, password: string) {
    this.user = user;
    this.email = email;
    this.password = password;
  }

  user: string;
  email: string;
  password: string;
}

export { User };
