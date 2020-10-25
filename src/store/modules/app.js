import { setToken, setUserName, getUserName, removeToken, removeUserName, getToken, removeActivePath } from "../../utils/app.js";
import { sgflogin } from "../../api/login.js";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: getToken() || '',
    username: getUserName() || ''
}

const getters = {
    isCollapse: state => state.isCollapse,
    username: state => state.username
}

const mutations = { //同步，不需要回调处理事情
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
            // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))

    },
    SET_TOKEN(state, value) {
        state.to_ken = value
    },
    SET_USERNAME(state, value) {
        console.log('1111')
        state.username = value
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            //接口
            sgflogin(requestData).then((response) => {
                let data = response.data
                content.commit('SET_TOKEN', data.token)
                content.commit('SET_USERNAME', data.username)
                setToken(data.token)
                setUserName(data.username)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    exit(content) {
        console.log('exit')
        return new Promise((resolve, reject) => {
            sessionStorage.removeItem('activePath')
            removeToken()
            removeUserName()
            removeActivePath()
            content.commit('SET_TOKEN', '')
            content.commit('SET_USERNAME', '')
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};