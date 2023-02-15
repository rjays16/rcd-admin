export const actions = {
  getAttendanceListPlenary({}) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/attendance/plenary')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getAttendanceListWorkshop({}) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/attendance/workshop')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  exportPlenary({}) {
    return new Promise((resolve, reject) =>{
      this.$axios.get('/attendance/export-plenary', {
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
      this.$axios.get('/attendance/export-workshop', {
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
