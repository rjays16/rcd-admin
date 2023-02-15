export const actions = {
    getOpeningDate({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/settings/vcc/opening-date')
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
            this.$axios.post('/settings/vcc/opening-date', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};
