export const state = () => ({
    industry_lectures: [],
});

export const getters = {
    getLectures: (state) => {
        return state.industry_lectures;
    },
};

export const mutations = {
    SET_LECTURES(state, data) {
        state.industry_lectures = data;
    },
};

export const actions = {
    getLectures({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/industry-lectures', data)
            .then(res => {
                resolve(res)
                commit('SET_LECTURES', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_LECTURES', []);
            })
        })
    },
    getLecture({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/industry-lectures/${id}`)
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
            this.$axios.post('/industry-lectures', data)
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
            this.$axios.post(`/industry-lectures/${data['id']}`, data)
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
            this.$axios.delete(`/industry-lectures/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};