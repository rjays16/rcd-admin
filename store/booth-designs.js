export const state = () => ({
    designs: [],
});

export const getters = {
    getBoothDesigns: (state) => {
        return state.designs;
    },
};

export const mutations = {
    SET_BOOTH_DESIGNS(state, data) {
        state.designs = data;
    },
};

export const actions = {
    getBoothDesigns({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/sponsors/booth-designs', data)
            .then(res => {
                resolve(res)
                commit('SET_BOOTH_DESIGNS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_BOOTH_DESIGNS', []);
            })
        })
    },
    getBoothDesign({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/booth-designs/${id}`)
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
            this.$axios.post('/sponsors/booth-designs', data)
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
            this.$axios.post(`/sponsors/booth-designs/${data.get('id')}`, data)
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
            this.$axios.delete(`/sponsors/booth-designs/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};