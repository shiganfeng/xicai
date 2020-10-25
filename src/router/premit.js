import router from "./index.js";
import store from "../store/index.js";
import { getToken, removeToken, removeUserName, removeActivePath } from "../utils/app.js";

const whiteRouter = ['/login'];

//路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            removeToken()
            removeUserName()
            removeActivePath()
            store.commit("app/SET_TOKEN", '')
            store.commit("app/SET_USERNAME", '')
            next()
        } else {
            console.log(to)
            if (to.matched.length == 0) {
                next('/404')
            }
            next()
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
    // next()
})