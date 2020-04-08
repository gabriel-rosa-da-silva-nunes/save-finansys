import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Firebase from 'firebase';

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Home
    },
    {
      path:'/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/ganhos',
      name: 'Cadastro de Ganhos',
      component: () => import('./views/Ganhos.vue')
    },
    {
      path: '/despesas',
      name: 'Cadastro de Despesas',
      component: () => import('./views/Despesas.vue')
    },
    {
      path: '/dividas',
      name: 'Cadastro de Dívidas',
      component: () => import('./views/Dividas.vue')
    }
  ]
})

router.beforeEach(
  (to,from,next) => {
    if (to.path != '/login') {
      if (!Firebase.auth().currentUser) {
        next({
          path:'/login',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    }
    next();
  }
);

export default router;