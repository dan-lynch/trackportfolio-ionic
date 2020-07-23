import React from 'react'
import { userService } from '../services/userService'

export const ContextProvider = ({ children }: any) => {
  const [signupEmail, setSignupEmail] = React.useState<string>('')
  const [stock, setStock] = React.useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false)
  const [resetPassSuccess, setResetPassSuccess] = React.useState<boolean>(false)
  const [userToken, setUserToken] = React.useState<string>('')

  const contextProps: Partial<ContextProps> = {
    signupEmail,
    setSignupEmail,
    stock,
    setStock,
    isDarkTheme,
    setIsDarkTheme,
    userService,
    resetPassSuccess,
    setResetPassSuccess,
    userToken,
    setUserToken,
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
  userService: any
  resetPassSuccess: boolean
  setResetPassSuccess: any
  userToken: string
  setUserToken: any
}

export const AppContext = React.createContext<Partial<ContextProps>>({})
