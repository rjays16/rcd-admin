export const state = () => ({
    yesNoOptions: [
        { id: 1, value: true, name: "Yes" },
        { id: 2, value: false, name: "No" }
    ],

    availableDateOptions: {
        disabledDate (date) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            return date < yesterday
        }
    },

    yesNo: [
        { id: 1, value: true, name: "Yes" },
        { id: 2, value: false, name: "No" }
    ],
    finalcategory: [
        { id: 1, value: 1, abstract_type: "E-Poster" },
        { id: 2, value: 2, abstract_type:  "Free Papers"}
    ],
    countries: [],
});

export const getters = {
    getCountries: (state) => {
        return state.countries;
    },
};

export const mutations = {
    SET_COUNTRIES(state, data) {
        state.countries = data;
    },
};

export const actions = {
    getCountries({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/countries')
            .then(res => {
                resolve(res)
                commit('SET_COUNTRIES', res.data);
            })
            .catch(err => {
                console.log(err)
                reject(err)
                commit('SET_COUNTRIES', []);
            })
        })
    },
};