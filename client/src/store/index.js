import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'http://localhost:3000/api'

export default new Vuex.Store({
  state: {
    cities: [],
    costs: [],
    isLogin: false
  },
  mutations: {
    SET_CITIES (state, payload) {
      state.cities = payload
    },
    SET_COSTS (state, payload) {
      state.costs = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    async getCities ({ commit }) {
      try {
        const { data } = await axios.get(`${baseURL}/city`)
        data.rajaongkir.results.forEach(el => {
          el.city_name = el.type === 'Kabupaten' ? `Kab. ${el.city_name}` : `${el.city_name} (kota)`
        })
        commit('SET_CITIES', data.rajaongkir.results)
      } catch (error) {
        throw Error(error)
      }
    },

    getCost ({ commit }, payload) {
      const jne = () => {
        return axios.post(`${baseURL}/cost`, { ...payload, courier: 'jne' })
      }
      const pos = () => {
        return axios.post(`${baseURL}/cost`, { ...payload, courier: 'pos' })
      }
      const tiki = () => {
        return axios.post(`${baseURL}/cost`, { ...payload, courier: 'tiki' })
      }

      const result = []
      Promise.all([jne(), pos(), tiki()])
        .then(data => {
          for (const res of data) {
            result.push(...res.data.rajaongkir.results)
          }
          commit('SET_COSTS', result)
        })
        .catch(error => {
          throw Error(error)
        })
    },

    async checkLogin ({ commit }) {
      const username = localStorage.getItem('username')
      if (username?.length) {
        commit('SET_ISLOGIN', true)
      } else {
        this.$router.push('/login')
      }
    }
  }
})
