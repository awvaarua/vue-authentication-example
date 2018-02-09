import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import { SUCCESS, LOADING, ERROR } from '../enum/loginStatus'
import apiCall from 'utils/api'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    commit(USER_REQUEST)
    apiCall({url: 'user/me'})
      .then(resp => {
        commit(USER_SUCCESS, resp)
      })
      .catch(resp => {
        commit(USER_ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = LOADING
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = SUCCESS
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = ERROR
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
