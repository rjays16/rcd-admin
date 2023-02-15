export const state = () => ({
    pendingMembers: [],
    activeMembers: [],
    allMembers: [],
    paidMembers: [],

    speakers: [],
    delegates: [],

    order_statuses: [
        { id: 1, name: "Pending" },
        { id: 2, name: "Completed" },
        { id: 3, name: "Failed" },
    ]
});

export const getters = {
    getPendingMembers: (state) => {
        return state.pendingMembers;
    },
    getActiveMembers: (state) => {
        return state.activeMembers;
    },
    getAllMembers: (state) => {
        return state.allMembers;
    },
    getPaidMembers: (state) => {
        return state.paidMembers;
    },

    getSpeakers: (state) => {
        return state.speakers;
    },
    getDelegates: (state) => {
        return state.delegates;
    },
};

export const mutations = {
    SET_PENDING_MEMBERS(state, data) {
        state.pendingMembers = data;
    },
    SET_ACTIVE_MEMBERS(state, data) {
        state.activeMembers = data;
    },
    SET_ALL_MEMBERS(state, data) {
        state.allMembers = data;
    },
    SET_PAID_MEMBERS(state, data) {
        state.paidMembers = data;
    },

    SET_SPEAKERS(state, data) {
        state.speakers = data;
    },
    SET_DELEGATES(state, data) {
        state.delegates = data;
    },
};

export const actions = {
    getPendingMembers({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/members/pending', data)
            .then(res => {
                resolve(res)
                commit('SET_PENDING_MEMBERS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_PENDING_MEMBERS', []);
            })
        })
    },
    getActiveMembers({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/members/active', {
				params: {
                    is_search: data.is_search,
					keyword: data.keyword,
                    show_all: data.show_all
				}
			})
            .then(res => {
                resolve(res)
                commit('SET_ACTIVE_MEMBERS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_ACTIVE_MEMBERS', []);
            })
        })
    },
    getAllMembers({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/members/all')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getPaidMembers({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/members/paid', {
				params: {
                    is_search: data.is_search,
					keyword: data.keyword,
                    show_all: data.show_all
				}
			})
            .then(res => {
                resolve(res)
                commit('SET_PAID_MEMBERS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_PAID_MEMBERS', []);
            })
        })
    },
    getMember({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/members/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    create({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/members', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    update({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/members/${data['member_id']}/profile`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    updateField({}, data) {
        return new Promise((resolve, reject) =>{
            this.$axios.post(`/members/${data['id']}/profile/field`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    approve({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/members/${id}/approve`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    delete({}, id){
        return new Promise((resolve, reject) =>{
            this.$axios.delete(`/members/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    import({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/members/import', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    exportTemplate({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/members/export/template', {
                responseType: 'blob'
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getPayments({}, member_id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/payments/${member_id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    updateOrder({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/orders/user/updateStatus', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    resendThankYouEmail({}, user_id) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/members/${user_id}/resendThankYouEmail`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    resendPaymentEmail({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/members/${data["user_id"]}/resendPaymentEmail`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    exportActive({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/members/export/active', {
                responseType: 'blob'
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    setDefaultPassword({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/members/setDefaultPassword', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getOrders({}, member_id) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/orders/user', {
				params: {
					member_id: member_id
				}
			})
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
  getCategoryList({commit}){
    return new Promise((resolve, reject) => {
      this.$axios.get('/abstracts/category')
        .then(res => {
          resolve(res)
        //   commit('SET_CATEGORY', res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        //   commit('SET_CATEGORY', []);
        })
    })
  },
  getOrderFees({}, member_id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/members/${member_id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  getOrderPayments({}, member_id) {
      return new Promise((resolve, reject) => {
        this.$axios.get(`/orders/user/${member_id}`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err.response.data.message)
          })
      })
  },
  getAuthor({commit}){
    return new Promise((resolve, reject) => {
      this.$axios.get('/abstracts/authors')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },
};
