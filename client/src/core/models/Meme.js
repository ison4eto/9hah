export default {
    defaultState: {
        title: '',
        imageUrl: '',
        selectedFile: '',
        ratings: 0,
        peopleRated: 0,
        categories: [],
        approved: false
    },
    validate: ({ title, imageUrl }) => {
        if (!title) {
            return 'Please fill in the title'
        }
        if (!imageUrl) {
            return 'You need to provide an image!'
        }
        return ''
    }
}