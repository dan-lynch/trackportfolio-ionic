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
import React, { useEffect, useState } from 'react';
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
import { authService } from '../services/authService';
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
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!authService.currentToken);

	const logout = () => {
    authService.signout();
    window.location.replace('/');
	}

  useEffect(() => {
    authService.currentToken ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [])
	
	return (
		<>
	{isLoggedIn && (
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
			<Typography variant='caption'>trackportfol.io BETA v1.0.5</Typography>
			</IonFooter>
		</IonMenu>
	)}
	</>
	);
};

export default withApollo(Menu)