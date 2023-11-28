declare namespace Express {
  interface Request {
    validatedUser: {
      first_name: string
      last_name: string
      email: string
      password: string
    }
   
  }
}