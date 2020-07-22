import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuToggle,
	IonRouterLink,
	IonImg,
	IonFooter,
	IonButton
} from '@ionic/react';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
	homeOutline,
	homeSharp,
	personOutline,
	personSharp,
	logOutOutline,
	logOutSharp
} from 'ionicons/icons';
import './Menu.css';
import Logo from '../assets/logo_light.svg';
import { withApollo } from '../components/withApollo'
import { AppContext } from '../context/AppContext';
import { userService } from '../services/userService';
import { Typography } from '@material-ui/core';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		iosIcon: homeOutline,
		mdIcon: homeSharp
	},
	{
		title: 'Account',
		url: '/account',
		iosIcon: personOutline,
		mdIcon: personSharp
	},
];

const useStyles = makeStyles(() => ({
	logo: {
		margin: '0.5rem 1rem 0 1rem',
		maxWidth: '12rem'
	},
	menu: {
		maxWidth: '20rem',
	}
}));

const Menu: React.FC = () => {
	const location = useLocation();
	const classes = useStyles();
	const appContext = useContext(AppContext);
	// const [updateTheme] = useMutation(graphqlService.UPDATE_THEME);

	const logout = () => {
    userService.logout();
    appContext.setIsLoggedIn(false);
    window.location.replace('/');
	}

	// const handleUpdateTheme = () => {
  //   const currentTheme = appContext.isDarkTheme;
  //   appContext.setIsDarkTheme(!currentTheme);
  //   userService.updateTheme(!currentTheme);
  //   storeUserTheme(!currentTheme);
	// }
	
	// const storeUserTheme = (darkTheme: boolean) => {
  //   updateTheme({ variables: { userDarkTheme: darkTheme } }).then((response) => {
  //     if (response.data.updateTheme.updatedTheme.success) {
  //       gaService.themeUpdateSuccessEvent();
  //     } else {
  //       gaService.themeUpdateFailedEvent();
  //     }
  //   })
  // }
	
	return (
		<IonMenu className={classes.menu} contentId="main" type="overlay">
			<IonContent>
				<IonRouterLink href="/" auto-hide="false">
					<IonImg className={classes.logo} src={Logo} />
				</IonRouterLink>
				<IonList id="menu-list">
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>						
								<IonItem
									className={location.pathname === appPage.url ? 'selected' : ''}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>
				{/* <IonButton expand ='block' onClick={handleUpdateTheme} className="ion-activatable ripple-parent">
					<IonIcon ios={contrastOutline} md={contrastSharp} />
					<IonRippleEffect type="unbounded" />
				</IonButton> */}
			</IonContent>
			<IonFooter style={{textAlign: 'right'}}>
			<IonButton
				onClick={logout}
				expand='block'
				fill='outline'
			>
				<IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
				<IonLabel>Logout</IonLabel>
			</IonButton>
			<Typography variant='caption'>trackportfol.io BETA v0.1.2</Typography>
			</IonFooter>
		</IonMenu>
	);
};

export default withApollo(Menu)