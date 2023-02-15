export const state = () => ({
    plenaries: [],

    headerColors: [
        { id: 1, name: "Orange", value: "orange" },
        { id: 2, name: "Black", value: "black" },
        { id: 3, name: "Blue", value: "blue" },
    ]
});

export const getters = {
    getPlenaryEvents: (state) => {
        return state.plenaries;
    },
};

export const mutations = {
    SET_PLENARIES(state, data) {
        state.plenaries = data;
    },
};

export const actions = {
    getPlenaryDays({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/plenaries/days', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getPlenaryEvents({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/plenaries', data)
            .then(res => {
                resolve(res)
                commit('SET_PLENARIES', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_PLENARIES', []);
            })
        })
    },
    getPlenaryEvent({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/plenaries/${id}`)
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
            this.$axios.post('/plenaries', data)
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
            this.$axios.post(`/plenaries/${data['id']}`, data)
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
            this.$axios.delete(`/plenaries/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};