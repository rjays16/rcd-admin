export const state = () => ({
    vips: [],
    
    types: [
        { id: 1, name: "Speaker/Session, Workshop Chair" },
        { id: 10, name: "Local PDS - COA, BOD, OC" },
    ],

    sub_types: [
        { id: 1, name: "Speaker/Session" },
        { id: 2, name: "Workshop Chair" },
        { id: 3, name: "Council of Adviser" },
        { id: 4, name: "Board of Director" },
        { id: 5, name: "Organizing Committee"}
    ],
});

export const getters = {
    getVIPs: (state) => {
        return state.vips;
    },
};

export const mutations = {
    SET_VIPS(state, data) {
        state.vips = data;
    },
};

export const actions = {
    // Start of CRUD
    getVIPs({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/vips', {
				params: {
                    is_search: data.is_search,
					keyword: data.keyword,
                    show_all: data.show_all
				}
			})
            .then(res => {
                resolve(res)
                commit('SET_VIPS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_VIPS', []);
            })
        })
    },
    getVIP({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/vips/${id}/profile`)
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
            this.$axios.post('/vips', data)
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
            console.log(data)
            this.$axios.post(`/vips/${data['vip_id']}/profile`, data)
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
            this.$axios.delete(`/vips/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of CRUD
    
    // Start of orders
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
    // End of orders

    // Start of resending Emails
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
    // End of resending Emails

    // Start of payments
    getPayments({}, user_id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/payments/${user_id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    approvePayment({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/orders/user/update', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of payments

    // Start of import/export Files
    import({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/vips/import', data)
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
            this.$axios.get('/vips/export/template', {
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
    // End of import/export Files
};