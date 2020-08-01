import React from 'react'

export const AppContext = React.createContext<Partial<ContextProps>>({})

const ContextProvider = ({ children }: any) => {
  const [stock, setStock] = React.useState<string>('')
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false)

  const contextProps: Partial<ContextProps> = {
    stock,
    setStock,
    isDarkTheme,
    setIsDarkTheme
  }

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

export type ContextProps = {
  stock: string
  setStock: any
  isDarkTheme: boolean
  setIsDarkTheme: any
}

export default ContextProvider
