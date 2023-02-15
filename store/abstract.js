export const state = () => ({
	abstracts: [],
  categories: [],
  types: [
    { id: 1, name: "E-Poster" },
    { id: 2, name: "Free Papers" }
  ],
});

export const getters = {
	getAbstract: (state) => {
		return state.abstracts;
  },
  getCategories: (state) => {
    return state.categories;
  },
};

export const mutations = {
	SET_ABSTRACTS(state, data) {
		state.abstracts = data
	},
  SET_CATEGORIES(state, data) {
		state.categories = data
	}
}

export const actions = {
  createFromAdmin({}, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/abstracts/admin', data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data.message)
      })
    })
  },
	getAllEposterAbstracts({}, id){
		return new Promise((resolve, reject) => {
			this.$axios.get('/abstracts/e-posters')
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err.response.data.message)
			})
		})
	},
	getAllFreePaperAbstracts({}, id){
		return new Promise((resolve, reject) => {
			this.$axios.get('/abstracts/free-papers')
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err.response.data.message)
			})
		})
	},
	getAbstract({}, id){
		return new Promise((resolve, reject) => {
			this.$axios.get(`/abstracts/${id}`)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err.response.data.message)
			})
		})
	},
  searchAbstract({commit}, data) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/abstracts/search_authors', {
        params: {
          is_search: data.is_search,
          keyword: data.keyword,
          show_all: data.show_all
        }
      })
      .then(res => {
        resolve(res)
        commit('SET_ABSTRACTS', res.data)
      })
      .catch(err => {
        reject(err.response.data.message)
        commit('SET_ABSTRACTS', []);
      })
    })
  },
	delete({}, id) {
    return new Promise((resolve, reject) =>{
      this.$axios.delete(`/abstracts/${id}`)
      .then(res => {
          resolve(res)
      })
      .catch(err => {
          reject(err.response.data.message)
      })
    })
  },
	resendThankYouEmail({}, id) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/abstracts/${id}/resendThankYouEmail`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data.message)
      })
    })
  },
  updateAbstract({}, data){
    return new Promise((resolve, reject) => {
      this.$axios.post(`abstracts/${data['id']}`, data)
      .then( res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data.message)
      })
    })
  },

  getCategories({commit}){
		return new Promise((resolve, reject) => {
			this.$axios.get('/abstracts/categories')
			.then(res => {
				resolve(res)
        commit('SET_CATEGORIES', res.data);
			})
			.catch(err => {
				reject(err)
        commit('SET_CATEGORIES', []);
			})
		})
	},
  getCategory({}, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/abstracts/categories/${id}`)
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
      this.$axios.post('/abstracts/categories', data)
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
      this.$axios.post(`/abstracts/categories/${data['id']}`, data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data.message)
      })
    })
  },
};