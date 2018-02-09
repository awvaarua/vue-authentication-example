/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import { LOADING, SUCCESS, ERROR } from '../enum/loginStatus'
import apiCall from 'utils/api'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: async ({ commit, dispatch }, user) => {
    commit(AUTH_REQUEST)
    try {
      let resp = await apiCall({ url: 'auth', data: user, method: 'POST' })
      localStorage.setItem('user-token', resp.token) // axios.defaults.headers.common['Authorization'] = resp.token
      commit(AUTH_SUCCESS, resp)
      dispatch(USER_REQUEST)
      return resp
    } catch (err) {
      commit(AUTH_ERROR, err)
      localStorage.removeItem('user-token')
      return err
    }
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = LOADING
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = SUCCESS
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = ERROR
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
