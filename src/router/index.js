import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "../views/Layout/index.vue"

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [{
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "主页"
        }
    },
    {
        path: "/myindex",
        hidden: "false",
        component: () =>
            import ("../views/Login/myindex.vue"),
        meta: {
            name: "测试login页面"
        }
    },
    {
        path: "/test",
        hidden: "false",
        component: () =>
            import ("../views/test/test.vue"),
        meta: {
            name: "测试login页面"
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        //要用箭头函数
        component: () =>
            import ("../views/Login/myindex.vue"),
        meta: {
            name: "登录"
        }
    },
    {
        path: "/404",
        name: "404",
        hidden: true,
        //要用箭头函数
        component: () =>
            import ("../views/feature/404.vue"),
        meta: {
            name: "404"
        }
    },
    {
        path: "/Chuangrong",
        name: "chuangrong",
        // redirect: 'index',
        meta: {
            name: "楼宇",
            icon: "chuangrong"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/ChuangrongList",
                name: "chuangronglist",
                //要用箭头函数
                component: () =>
                    import ("../views/Chuang/chuang.vue"),
                meta: {
                    name: "楼宇租赁信息列表"
                }
            },
            {
                path: "/chuangInfo",
                name: "chuanginfo",
                //要用箭头函数
                component: () =>
                    import ("../views/Chuang/chuangInfo.vue"),
                meta: {
                    name: "楼宇新增/编辑信息"
                }
            }
        ]
    },
    {
        path: "/Yingyue",
        name: "Yingyue",
        meta: {
            name: "映月",
            icon: "moon"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/YingyueList",
                name: "yingyuelist",
                //要用箭头函数
                component: () =>
                    import ("../views/Yingyue/yingyue.vue"),
                meta: {
                    name: "映月租赁信息列表"
                }
            },
            {
                path: "/yingyueInfo",
                name: "yingyueinfo",
                //要用箭头函数
                component: () =>
                    import ("../views/Yingyue/yingyueInfo.vue"),
                meta: {
                    name: "映月新增/编辑信息"
                }
            }
        ]
    },
    {
        path: "/Shangpu",
        name: "Shangpu",
        meta: {
            name: "商铺",
            icon: "shangpu"
        },
        //要用箭头函数
        component: Layout,
        children: [{
            path: "/ShangpuList",
            name: "shangpulist",
            //要用箭头函数
            component: () =>
                import ("../views/Shangpu/shangpu.vue"),
            meta: {
                name: "商铺租赁信息列表"
            }
        }, {
            path: "/shangpuInfo",
            name: "shangpuinfo",
            //要用箭头函数
            component: () =>
                import ("../views/Shangpu/shangpuInfo.vue"),
            meta: {
                name: "商铺新增/编辑信息"
            }
        }]
    },
    {
        path: "/Rencai",
        name: "Rencai",
        meta: {
            name: "人才公寓",
            icon: "gongyu"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/RencaiList",
                name: "rencailist",
                //要用箭头函数
                component: () =>
                    import ("../views/Rencai/rencai.vue"),
                meta: {
                    name: "人才公寓租赁信息列表"
                }
            },
            {
                path: "/rencaiInfo",
                name: "rencaiinfo",
                //要用箭头函数
                component: () =>
                    import ("../views/Rencai/rencaiInfo.vue"),
                meta: {
                    name: "人才新增/编辑信息"
                }
            }
        ]
    },
    {
        path: "/Dingye",
        name: "Dingye",
        meta: {
            name: "鼎业大厦",
            icon: "dingye"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/DingyeList",
                name: "dingyelist",
                //要用箭头函数
                component: () =>
                    import ("../views/Dingye/dingye.vue"),
                meta: {
                    name: "鼎业大厦租赁信息列表"
                }
            },
            {
                path: "/dingyeInfo",
                name: "dingyeinfo",
                //要用箭头函数
                component: () =>
                    import ("../views/Dingye/dingyeInfo.vue"),
                meta: {
                    name: "鼎业大厦新增/编辑信息"
                }
            }
        ]
    },
    {
        path: "/East",
        name: "East",
        meta: {
            name: "无锡东站",
            icon: "east"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/EastList",
                name: "eastlist",
                //要用箭头函数
                component: () =>
                    import ("../views/East/east.vue"),
                meta: {
                    name: "无锡东站租赁信息列表"
                }
            },
            {
                path: "/eastInfo",
                name: "eastinfo",
                //要用箭头函数
                component: () =>
                    import ("../views/East/eastInfo.vue"),
                meta: {
                    name: "无锡东站新增/编辑信息"
                }
            }
        ]
    },
    {
        path: "/Zheda",
        name: "Zheda",
        meta: {
            name: "浙大网新",
            icon: "zheda"
        },
        //要用箭头函数
        component: Layout,
        children: [{
                path: "/ZhedaList",
                name: "zhedalist",
                //要用箭头函数
                component: () =>
                    import ("../views/Zheda/zheda.vue"),
                meta: {
                    name: "浙大网新租赁信息列表"
                }
            },
            {
                path: "/zhedaInfo",
                name: "zhedainfo",
                //要用箭头函数
                component: () =>
                    import ("../views/Zheda/zhedaInfo.vue"),
                meta: {
                    name: "浙大网新新增/编辑信息"
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true,
        meta: {
            name: '404',
            icon: '404'
        }
    }
];


const router = new VueRouter({
    mode: 'hash',
    routes,
});

export default router;