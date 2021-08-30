import { createStore } from 'vuex'
import { useCookies } from '@vueuse/integrations'
import * as api from './api'
import { $axios } from './utils/axios';

const cookies = useCookies(['locale']);

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: false
    },

    orderForm: {
      products: [],
      giftsCount: 1,
      designId: null,
      designComment: '',
      recipient: {}
    },

    orderStatusFilter: '',
    orders: [],
    orderStep: 0,
    currentOrder: null
  },

  getters: {
    auth (state) {
      return state.user
    },

    userId (state) {
      return state.user.data.id
    },

    orderForm (state) {
      return state.orderForm;
    },

    status (state) {
      return state.orderStatusFilter;
    },

    orders (state) {
      return state.orders;
    },

    orderStep (state) {
      return state.orderStep;
    },

    isAuth (state) {
      return state.user.loggedIn;
    },

    currentOrder (state) {
      return state.currentOrder
    }
  },

  mutations: {
    setUser (state, user) {
      state.user.data = user;
      state.user.loggedIn = true;
    },

    setOrderProducts (state, products) {
      state.orderForm.products = [products];
    },

    setGiftsCount (state, count) {
      state.orderForm.giftsCount = count;
    },

    setOrderDesign (state, designId) {
      state.orderForm.designId = designId;
    },

    setOrderDesignComment (state, comment) {
      state.orderForm.designComment = comment;
    },

    setRecipient (state, recipient) {
      state.orderForm.recipient = recipient;
    },

    setOrderStatusFilter (state, status) {
      state.orderStatusFilter = status;
    },

    setOrders (state, orders) {
      state.orders = orders;
    },

    setOrderStep (state, step) {
      state.orderStep = step;
    },

    setCurrentOrder (state, order) {
      state.currentOrder = order;
    }
  },

  actions: {
    async loadUser ({commit}) {
      const accessToken = cookies.get('access_token');
      const userEmail = cookies.get('user_email');

      if (!accessToken && !userEmail) {
        return null;
      } else {
        $axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }

      try {
        const { data } = await api.user.profile(userEmail);
        commit('setUser', data.data.data);
      } catch (error) {
        console.error(error);
      }
    },

    async createOrder ({state}) {
      try {
        const productsPackage = {
          productIds: 0,
          designId: state.orderForm.designId,
          commit: state.orderForm.designComment,
          price: 1000
        };

        const orderForm = {
          products: state.orderForm.products,
          packages: [productsPackage],
          recipient: state.orderForm.recipient
        };
        await api.orders.create(orderForm);

      } catch (error) {
        console.error(error);
      }
    },


    async loadOrders ({ state, commit }) {
      try {
        const userId = state.user.data.id;
        const { data } = await api.orders.getOrders(userId, state.orderStatusFilter ?? '');

        commit('setOrders', data.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default store;
