import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  signup: {
    lineHeight: 'initial',
  }
}))

type Props = {
  openLogin: () => any
  openJoin: () => any
}

export default function LoggedOutHeader(props: Props) {
  const { openLogin, openJoin } = props

  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar>
        <div className={classes.title}>
          <Link to='/'>
            <img src='/logo.svg' alt='trackportfol.io logo' className={classes.logo} />
          </Link>
        </div>
          <Button color='inherit' onClick={openLogin}>
            Login
          </Button>
          <Button className={classes.signup} variant='outlined' color='secondary' onClick={openJoin}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
