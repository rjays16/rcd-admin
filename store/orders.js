export const state = () => ({
    orders: [],
});

export const getters = {
    getOrders: (state) => {
        return state.orders;
    },
};

export const mutations = {
    SET_ORDERS(state, data) {
        state.orders = data;
    },
};

export const actions = {
    getOrders({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/orders', {
                params: {
                    is_search: data.is_search,
                    keyword: data.keyword,
                    show_all: data.show_all
                }
            })
            .then(res => {
                resolve(res)
                commit('SET_ORDERS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_ORDERS', []);
            })
        })
    },
    getOrder({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/orders/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
};