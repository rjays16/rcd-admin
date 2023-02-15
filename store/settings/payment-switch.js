export const actions = {
    getSettings({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/settings/payment-switch/workshop')
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
            this.$axios.post('/settings/payment-switch/workshop', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};