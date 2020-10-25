<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            transitionName: ''
        }
    },
    watch:{
        $route(to, from){
            this.transitionName = 'slide-left'
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
    // height: 100vh;
    overflow-y: scroll;
    position: fixed;
    left: $navMenu;
    top: 56px;
    bottom: 0;
    right: 0;
    // border: 30px solid #f7f7f7;
    border-bottom: none;
    background-color: #fff;
    // -webkit-box-sizing: border;
}
.content{
    width: 100%;
    height: 100%;
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
}

.open{
    #main-wrap{
        left: $navMenu;
    }
}

.close{
    #main-wrap{
        left: 64px;
    }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>