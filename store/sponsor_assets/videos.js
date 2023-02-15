export const state = () => ({
    assetPositions: [
        { id: 1, name: "Top Left" },
        { id: 2, name: "Bottom Left" },
        { id: 3, name: "Top Right" },
        { id: 4, name: "Bottom Right" }
    ],
});

export const actions = {
    getVideos({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${id}/videos`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    getVideo({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/sponsors/${data["id"]}/videos/${data["video_id"]}`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/videos`, data)
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
            this.$axios.post(`/sponsors/${data["id"]}/videos/${data["video_id"]}`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    uploadVideo({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/sponsors/${data.get('id')}/videos/upload`, data)
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
            this.$axios.delete(`/sponsors/${data["sponsor_id"]}/videos/${data["id"]}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};