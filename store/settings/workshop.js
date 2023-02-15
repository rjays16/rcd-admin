export const actions = {
  getOpeningDateWorkshop({}) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/settings/vcc/workshop')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  update({}, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/settings/vcc/workshop/${data['id']}`, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
};
