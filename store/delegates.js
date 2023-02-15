export const state = () => ({
    delegates: [],
    
    types: [
        { id: 9, name: "International Officers of LAD Member Countries" },
        { id: 2, name: "International LADS Member" },
        { id: 3, name: "International non-LADS" },  
        { id: 4, name: "International Resident" },
        { id: 5, name: "Local PDS Member" },
        { id: 6, name: "Local PDS Resident" },
        { id: 7, name: "Local Non PDS MD" },
        { id: 8, name: "Local Non PDS Resident of Applicants Institutions" }
    ],
});

export const getters = {
    getDelegates: (state) => {
        return state.delegates;
    },
};

export const mutations = {
    SET_DELEGATES(state, data) {
        state.delegates = data;
    },
};

export const actions = {
    // Start of CRUD
    getDelegates({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/delegates', {
				params: {
                    is_search: data.is_search,
					keyword: data.keyword,
                    show_all: data.show_all
				}
			})
            .then(res => {
                resolve(res)
                commit('SET_DELEGATES', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_DELEGATES', []);
            })
        })
    },
    getDelegate({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/delegates/${id}/profile`)
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
            this.$axios.post('/delegates', data)
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
            this.$axios.post(`/delegates/${data['delegate_id']}/profile`, data)
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
            this.$axios.delete(`/delegates/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of CRUD

    // Start of import/export Files
    import({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/delegates/import', data)
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
            this.$axios.get('/delegates/export/template', {
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