import { createStore } from 'vuex'
import { useCookies } from '@vueuse/integrations'
import * as api from './api'
import { $axios } from './utils/axios';
import de from "element-plus/packages/locale/lang/de";

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
      designId: 1,
      designComment: '',
      recipient: {}
    },

    orderStatusFilter: '',
    orders: []
  },

  getters: {
    auth (state) {
      return state.user
    },

    orderForm (state) {
      return state.orderForm;
    },

    status (state) {
      return state.orderStatusFilter;
    },

    orders (state) {
      return state.orders;
    }
  },

  mutations: {
    setUser (state, user) {
      state.user.data = user;
      state.user.loggedIn = true;
    },

    setOrderProducts (state, products) {
      state.orderForm.products = products;
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
    }
  },

  actions: {
    async loadUser ({commit}) {
      const accessToken = cookies.get('access_token');

      if (!accessToken) {
        return null;
      } else {
        $axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }

      try {
        const { data } = await api.user.profile(this.$axios);

        commit('setUser', data);
      } catch (error) {
        console.error(error);
      }
    },

    async createOrder ({state}) {
      try {
        const productsPackage = {
          productIds: state.orderForm.products.map(product => product.id),
          designId: state.orderForm.designId,
          commit: state.orderForm.designComment,
          price: 1000
        };

        const orderForm = {
          products: state.products,
          packages: [productsPackage],
          recipient: state.orderForm.recipient
        };

        await api.orders.create(this.$axios, orderForm);

      } catch (error) {
        console.error(error);
      }
    },


    async loadOrders ({ state, commit }) {
      try {
        const params = {};
        if (state.orderStatusFilter) {
          params.status = state.orderStatusFilter;
        }

        const { data } = await api.orders.getOrders(params);

        commit('setOrders', data);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default store;
