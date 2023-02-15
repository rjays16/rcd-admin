export const actions = {
    getProductCatalogues({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${id}/product-catalogue`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getProductCatalogue({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${data["id"]}/product-catalogue/${data["product_catalogue_id"]}`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/product-catalogue`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/product-catalogue/${data["product_catalogue_id"]}`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    uploadBrochure({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/sponsors/${data.get('id')}/product-catalogue/upload`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    delete({}, data) {
        return new Promise((resolve, reject) =>{
            this.$axios.delete(`/sponsors/${data["sponsor_id"]}/product-catalogue/${data["id"]}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};