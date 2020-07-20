import Menu from './components/Menu';
import Page from './pages/Page';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Home from './pages/Home';
import ResetPass from './pages/ResetPass';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

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

  return (
    <IonApp>
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
    </IonApp>
  );
};

export default App;
