export const state = () => ({
    sponsors: [],
});

export const getters = {
    getSponsors: (state) => {
        return state.sponsors;
    },
};

export const mutations = {
    SET_SPONSORS(state, data) {
        state.sponsors = data;
    },
};

export const actions = {
    getSponsors({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/sponsors', data)
            .then(res => {
                resolve(res)
                commit('SET_SPONSORS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_SPONSORS', []);
            })
        })
    },
    getSponsor({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getSponsorTypes({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/sponsors/types', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    create({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/sponsors', data)
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
            this.$axios.post(`/sponsors/${data.get('id')}`, data)
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
            this.$axios.post(`/sponsors/${id}/approve`)
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
            this.$axios.delete(`/sponsors/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};