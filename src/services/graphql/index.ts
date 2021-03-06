import {
  CREATE_HOLDING, 
  UPDATE_HOLDING, 
  DELETE_HOLDING,
  UPDATE_THEME
} from './mutations'

import {
  CURRENT_USER,
  ALL_INSTRUMENTS,
  ALL_HOLDINGS,
  SEARCH_INSTRUMENTS
} from './queries'

import {
  SUBSCRIBE_CURRENT_USER,
  SUBSCRIBE_ALL_HOLDINGS
} from './subscriptions'

export const graphqlService = {
  CREATE_HOLDING, 
  UPDATE_HOLDING, 
  DELETE_HOLDING,
  UPDATE_THEME,
  CURRENT_USER,
  ALL_INSTRUMENTS,
  ALL_HOLDINGS,
  SEARCH_INSTRUMENTS,
  SUBSCRIBE_CURRENT_USER,
  SUBSCRIBE_ALL_HOLDINGS
};
