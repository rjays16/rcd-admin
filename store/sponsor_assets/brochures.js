export const state = () => ({
    assetPositions: [
        { id: 1, name: "Left (First)" },
        { id: 2, name: "Left (Second)" },
        { id: 3, name: "Left (Third)" },
        { id: 4, name: "Left (Fourth)" },
        { id: 5, name: "Right (First)" },
        { id: 6, name: "Right (Second)" },
        { id: 7, name: "Right (Third)" },
        { id: 8, name: "Right (Fourth)" },
    ],
});

export const actions = {
    getBrochures({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${id}/brochures`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getBrochure({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${data["id"]}/brochures/${data["brochure_id"]}`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/brochures`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/brochures/${data["brochure_id"]}`, data)
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
            this.$axios.post(`/sponsors/${data.get('id')}/brochures/upload`, data)
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
            this.$axios.delete(`/sponsors/${data["sponsor_id"]}/brochures/${data["id"]}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};