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

const user = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem(USER)!))

const token = new BehaviorSubject<Token | null>(JSON.parse(localStorage.getItem(TOKEN)!))

export const userService = {
  login,
  logout,
  storeUserData,
  get currentUser(): User | null {
    return user.value
  },
  get currentToken(): Token | null {
    return token.value
  }
}

function login(jwtToken: string) {
  try {
    const tokenObj: Token = { authToken: jwtToken }
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, JSON.stringify(tokenObj));
    token.next(tokenObj);
    return true;
  } catch {
    return false;
  }
}

async function logout() {
  localStorage.clear()
  user.next(null);
  token.next(null);
}

async function storeUserData(data: any) {
  const { id, username } = data.currentUser
  if (id) {
    const userObj: User = { userId: id, username }
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(userObj));
    user.next(userObj)
    ReactGA.set({ userId: id })
  }
}