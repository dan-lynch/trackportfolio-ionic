import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga'
import { AppContext, ContextProps } from './context/AppContext';
import Menu from './components/Menu';
import Page from './pages/Page';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Home from './pages/Home';
import ResetPass from './pages/ResetPass';
import { lightTheme } from './helpers/theme'; 
import { GA_ID } from './helpers/constants';
import { userService } from './services/userService';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const [signupEmail, setSignupEmail] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [resetPassSuccess, setResetPassSuccess] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');

  const state: ContextProps = {
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
    setUserToken
  };

  useEffect(() => {
    const trackingId = GA_ID;
    ReactGA.initialize(trackingId);
  }, [])

  return (
    <IonApp>
      <AppContext.Provider value={state}>
        <ThemeProvider theme={lightTheme}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" component={Home} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/account" component={Account} exact />
            <Route path="/resetpass/:token" component={ResetPass} exact />
            <Route path="/page/:name" component={Page} exact />
          </IonRouterOutlet>
          <Menu />
        </IonSplitPane>
      </IonReactRouter>
      </ThemeProvider>
      </AppContext.Provider>
    </IonApp>
  );
};

export default App;
