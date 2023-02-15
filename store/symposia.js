export const state = () => ({
    categories: [],
    events: [],
    views: [],

    cardHeaderColors: [
        { id: 1, name: "Blue", value: "blue" },
        { id: 2, name: "Orange", value: "orange" },
        { id: 3, name: "Yellow", value: "yellow" },
    ]
});

export const getters = {
    getCategories: (state) => {
        return state.categories;
    },
    getEvents: (state) => {
        return state.events;
    },
    getViews: (state) => {
        return state.views;
    },
};

export const mutations = {
    SET_CATEGORIES(state, data) {
        state.categories = data;
    },
    SET_EVENTS(state, data) {
        state.events = data;
    },
    SET_VIEWS(state, data) {
        state.views = data;
    },
};

export const actions = {
    getCategories({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/symposia/categories', data)
            .then(res => {
                resolve(res)
                commit('SET_CATEGORIES', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_CATEGORIES', []);
            })
        })
    },
    getCategory({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/symposia/categories/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    createCategory({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/symposia/categories', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    updateCategory({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/symposia/categories/${data['id']}`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    deleteCategory({}, id){
        return new Promise((resolve, reject) =>{
            this.$axios.delete(`/symposia/categories/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },

    getEvents({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/symposia', {
                params: {
                    is_search: data.is_search,
                    keyword: data.keyword,
                    show_all: data.show_all
                }
            })
            .then(res => {
                resolve(res)
                commit('SET_EVENTS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_EVENTS', []);
            })
        })
    },
    getEvent({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/symposia/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    createEvent({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/symposia', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    updateEvent({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/symposia/${data['id']}`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    deleteEvent({}, id){
        return new Promise((resolve, reject) =>{
            this.$axios.delete(`/symposia/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },

    getViews({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/symposia/views')
            .then(res => {
                resolve(res)
                commit('SET_VIEWS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_VIEWS', []);
            })
        })
    },
    exportViews({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/symposia/views/export', {
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
};