import React, { useContext, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import BrightnessIcon from '@material-ui/icons/Brightness4'
import { AppContext } from '../../context/AppContext'
import { userService } from '../../services/userService'
import { graphqlService } from '../../services/graphql'
import { gaService } from '../../services/gaService'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginTop: '0.4rem',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      maxWidth: '9rem',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '9rem',
    },
  },
  menu: {
    width: 250,
  },
  brightness: {
    width: '100%',
  },
}))

export default function LoggedInHeader() {
  const classes = useStyles()
  const appContext = useContext(AppContext)
  const [updateTheme] = useMutation(graphqlService.UPDATE_THEME)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [toHome, setToHome] = useState<boolean>(false)
  const [toDashboard, setToDashboard] = useState<boolean>(false)
  const [toAccount, setToAccount] = useState<boolean>(false)

  const handleUpdateTheme = () => {
    const currentTheme = appContext.isDarkTheme
    appContext.setIsDarkTheme(!currentTheme)
    userService.updateTheme(!currentTheme)
    storeUserTheme(!currentTheme)
  }

  const storeUserTheme = (darkTheme: boolean) => {
    updateTheme({ variables: { userDarkTheme: darkTheme } }).then((response) => {
      if (response.data.updateTheme.updatedTheme.success) {
        gaService.themeUpdateSuccessEvent()
      } else {
        gaService.themeUpdateFailedEvent()
      }
    })
  }

  const logout = () => {
    userService.logout()
    appContext.setIsLoggedIn(false)
    setToHome(true)
  }

  return (
    <>
    {toHome ? <Redirect to='/' /> : null}
    {toDashboard ? <Redirect to='/dashboard' /> : null}
    {toAccount ? <Redirect to='/account' /> : null}
    <AppBar position='static'>
      <Toolbar>
        <div className={classes.title}>
          <Link to='/'>
            <img src='/assets/icon/logo.svg' alt='trackportfol.io logo' className={classes.logo} />
          </Link>
        </div>
        <Button onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className={classes.menuButton} />
          <Typography variant='srOnly'>Menu</Typography>
        </Button>
        <Drawer anchor='right' open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div
            className={classes.menu}
            role='presentation'
            onClick={() => setIsMenuOpen(false)}
            onKeyDown={() => setIsMenuOpen(false)}>
            <List>
              <ListItem button onClick={() => setToDashboard(true)} key='dashboard'>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText color='inherit' primary='Dashboard' />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => setToAccount(true)} key='account'>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Account' />
              </ListItem>
              <ListItem button onClick={logout} key='logout'>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
            <ToggleButton
              value='check'
              selected={appContext.isDarkTheme}
              className={classes.brightness}
              onChange={handleUpdateTheme}>
              <BrightnessIcon />
            </ToggleButton>
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
    </>
  )
}
