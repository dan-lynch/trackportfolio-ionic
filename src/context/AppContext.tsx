import React from 'react'
import { userService } from '../services/userService'

export const ContextProvider = ({ children }: any) => {
  const [signupEmail, setSignupEmail] = React.useState<string>('')
  const [stock, setStock] = React.useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(userService.theme === 'dark' || false)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const [resetPassSuccess, setResetPassSuccess] = React.useState<boolean>(false)

  const contextProps: Partial<ContextProps> = {
    signupEmail,
    setSignupEmail,
    stock,
    setStock,
    isDarkTheme,
    setIsDarkTheme,
    isLoggedIn,
    setIsLoggedIn,
    userService,
    resetPassSuccess,
    setResetPassSuccess,
  }

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

export type ContextProps = {
  signupEmail: string
  setSignupEmail: any
  stock: string
  setStock: any
  isDarkTheme: boolean
  setIsDarkTheme: any
  isLoggedIn: boolean
  setIsLoggedIn: any
  userService: any
  resetPassSuccess: boolean
  setResetPassSuccess: any
}

export const AppContext = React.createContext<Partial<ContextProps>>({})
