import { Plugins } from '@capacitor/core';
import ReactGA from 'react-ga';
import { BehaviorSubject } from 'rxjs';
import { USER, TOKEN } from '../helpers/constants';

export type User = {
  userId: number
  username: string
}

export type Token = {
  authToken: string
}

const { Storage } = Plugins;

const user = new BehaviorSubject<User | null>(null);

const token = new BehaviorSubject<Token | null>(JSON.parse(Storage.get({ key: USER })!))

export const userService = {
  login,
  logout,
  storeUserData,
  get currentUser(): User | null {
    return user.getValue()
  },
  get currentToken(): Token | null {
    console.log('get currentToken' + JSON.stringify(token.getValue))
    return token.value
  },
  get isLoggedIn(): boolean {
    return !!user.getValue()
  }
}

async function login(jwtToken: string) {
  await Storage.remove({ key: TOKEN });
  await Storage.set({
    key: TOKEN,
    value: jwtToken
  });
  token.next({ authToken: jwtToken })
}

async function logout() {
  await Storage.clear();
  user.next(null);
  token.next(null);
}

async function storeUserData(data: any) {
  const { id, username } = data.currentUser
  if (id) {
    const userObj: User = { userId: id, username }
    await Storage.remove({ key: USER });
    await Storage.set({
      key: USER,
      value: JSON.stringify(userObj)
    });
    user.next(userObj)
    ReactGA.set({ userId: id })
  }
}

// async function getUser() {
//   const userObject = await Storage.get({ key: USER });
//   return userObject.value ? JSON.parse(userObject.value) : null;
// }

// async function getToken() {
//   const { value } = await Storage.get({ key: TOKEN });
//   return value;
// }

// async function getTheme() {
//   const { value } = await Storage.get({ key: THEME });
//   return value;
// }

// async function updateTheme(isDarkTheme: boolean) {
//   await Storage.remove({ key: THEME });
//   await Storage.set({
//     key: THEME,
//     value: isDarkTheme ? 'dark' : 'light'
//   });
// }