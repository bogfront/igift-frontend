import { createWebHistory, createRouter } from "vue-router";

import Auth from '../pages/Auth.page.vue';
import Dashboard from '../pages/Dashboard.page.vue';
import CreateOrder from '../pages/CreateOrder.page.vue';
import Order from '../pages/Order.page.vue';

import AuthMain from "../components/auth/AuthMain.vue";
import AuthLogin from "../components/auth/AuthLogin.vue";
import AuthForgot from "../components/auth/AuthForgot.vue";
import AuthResetPassword from "../components/auth/AuthResetPassword.vue";
import AuthRegister from "../components/auth/AuthRegister.vue";
import CreateOrderProducts from '../components/create-order/CreateOrderProducts.vue'
import CreateOrderProductsSubmit from '../components/create-order/CreateOrderProductsSubmit.vue'
import CreateOrderDesign from '../components/create-order/CreateOrderDesign.vue'
import CreateOrderRecipient from '../components/create-order/CreateOrderRecipient.vue'
import CreateOrderCheck from '../components/create-order/CreateOrderCheck.vue'

import store from '../store'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware: [
        auth
      ]
    }
  },

  {
    path: '/order/:id',
    name: 'order',
    component: Order,
    meta: {
      middleware: [
        auth
      ]
    }
  },

  {
    path: '/order/create',
    name: 'create-order',
    component: CreateOrder,
    meta: {
      middleware: [
        auth
      ]
    },

    children: [
      {
        path: '/order/create/products',
        name: 'create-order-products',
        component: CreateOrderProducts
      },
      {
        path: '/order/create/products-submit',
        name: 'create-order-products-submit',
        component: CreateOrderProductsSubmit
      },
      {
        path: '/order/create/design',
        name: 'create-order-design',
        component: CreateOrderDesign
      },
      {
        path: '/order/create/design',
        name: 'create-order-recipient',
        component: CreateOrderRecipient
      },
      {
        path: '/order/create/check',
        name: 'create-order-check',
        component: CreateOrderCheck
      }
    ]
  },

  {
    path: '/auth',
    name: 'auth',
    component: Auth,

    children: [
      {
        path: '/auth/main',
        name: 'auth-main',
        component: AuthMain,
        meta: {
          middleware: [
            guest
          ]
        }
      },

      {
        path: '/auth/login',
        name: 'login',
        component: AuthLogin,
        meta: {
          middleware: [
            guest
          ]
        }
      },

      {
        path: '/auth/register',
        name: 'register',
        component: AuthRegister
      },

      {
        path: '/auth/forgot',
        name: 'forgot',
        component: AuthForgot
      },

      {
        path: '/auth/reset-password/:token',
        name: 'reset-password',
        component: AuthResetPassword
      }
    ]
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
