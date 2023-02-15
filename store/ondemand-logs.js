export const actions = {
    getPlenaryLogs({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/ondemand-logs/plenary')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getWorkshopLogs({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/ondemand-logs/workshop')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getSymposiaLogs({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/ondemand-logs/symposium')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getIndustryLogs({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/ondemand-logs/industry')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },

    exportPlenary({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/ondemand-logs/plenary/export', {
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
    exportWorkshop({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/ondemand-logs/workshop/export', {
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
    exportSymposia({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/ondemand-logs/symposium/export', {
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
    exportIndustry({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/ondemand-logs/industry/export', {
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