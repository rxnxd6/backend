declare namespace Express {
  interface Request {
    validatedUser: {
      first_name: string
      last_name: string
      email: string
      password: string
    }
    decodedUser: {
      userId: string
      email: string
      role: 'visitor' | 'admin'
      iat: number
      exp: number
    }
    validatedLoginUser: {
      email: string
      password: string
    }
    
   
  }
  
}