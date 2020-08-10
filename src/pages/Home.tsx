import React, { useEffect } from 'react'
import { withApollo } from '../components/withApollo'
import { initApolloClient } from '../services/apolloService'
import Modal from '../components/Modal'
import LoginForm from '../components/Forms/Login'
import SignUpForm from '../components/Forms/SignUp'
import ForgotPassForm from '../components/Forms/ForgotPass'
import { ModalOptions } from '../helpers/types'
import { authService } from '../services/authService'
import { IonPage, IonContent, IonButton, IonIcon, IonLabel } from '@ionic/react'
import { logInOutline, logInSharp, personAddOutline, personAddSharp } from 'ionicons/icons'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  paper: {
    height: '20%',
    width: '100%',
    marginTop: '3rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
		margin: '2rem 1rem 0 1rem',
    maxWidth: '50%',
    alignSelf: 'center',
    textAlign: 'center'
	},
}))

function Home() {

  const classes = useStyles()
  const [currentModal, setCurrentModal] = React.useState<ModalOptions>(ModalOptions.None)
  const openLoginModal = () => setCurrentModal(ModalOptions.Login)
  const openSignupModal = () => setCurrentModal(ModalOptions.SignUp)
  const openForgotPassModal = () => setCurrentModal(ModalOptions.ForgotPass)
  const closeModal = () => setCurrentModal(ModalOptions.None)

  const checkUser = async () => {
    if (authService.currentToken) {
      window.location.replace('/dashboard')
    }
  }

  useEffect(() => {
    checkUser();
  }, [])

  return (
    <IonPage>
      <IonContent>
      <img src='/assets/icon/logo.svg' alt='trackportfol.io logo' className={classes.logo} />
        <div className={classes.paper}>
			<IonButton
				onClick={openLoginModal}
        expand='block'
        color='secondary'
				fill='outline'>
				<IonIcon slot="start" ios={logInOutline} md={logInSharp} />
				<IonLabel>LOGIN</IonLabel>
			</IonButton>
      <br />
      </div>
      <div className={classes.paper}>
      <IonButton
				onClick={openSignupModal}
        expand='block'
        color='secondary'
				fill='outline'>
				<IonIcon slot="start" ios={personAddOutline} md={personAddSharp} />
				<IonLabel>REGISTER</IonLabel>
			</IonButton>
      </div>
      </IonContent>
      <Modal
        open={currentModal === ModalOptions.Login}
        onClose={closeModal}
        label='Log in form'
        title='Log in'
        titleId='log-in'>
        <LoginForm openSignupForm={openSignupModal} openForgotPassForm={openForgotPassModal} />
      </Modal>
      <Modal
        open={currentModal === ModalOptions.SignUp}
        onClose={closeModal}
        label='Create your account form'
        title='Create your account'
        titleId='create-your-account'>
        <SignUpForm openLoginForm={openLoginModal} />
      </Modal>
      <Modal
        open={currentModal === ModalOptions.ForgotPass}
        onClose={closeModal}
        label='Forgot password form'
        title='Forgot password'
        titleId='forgot-password'>
        <ForgotPassForm />
      </Modal>
    </IonPage>
  )
}

export async function getStaticProps() {
  const client = await initApolloClient({})
  return {
    unstable_revalidate: 300,
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(Home)
