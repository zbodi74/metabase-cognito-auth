import { CLEAR_SESSION, SET_SESSION } from '../constants/actionTypes'
import appConfig from '../config/app-config.json'
const jwt = require('jsonwebtoken');

const initialState = {
  isLoggedIn: false
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const params = {
        email: action.session.user.email,
        first_name: action.session.user.first_name,
        last_name: action.session.user.last_name,
        exp: Math.round(Date.now() / 1000) + (1 * 60) // 1 minute expiration
      };
      const token = jwt.sign(params, appConfig.metabaseSecret);
      return Object.assign({},
        action.session,
        { isLoggedIn: true, jwt: token })

    case CLEAR_SESSION:
      return initialState

    default:
      return state
  }
}

export default session
