export default {
    defaultState: {
        title: '',
        content: ''
    },
    validate: ({ title, content }) => {
        if (!title) {
            return 'Please fill in the title'
        }
        if (!content) {
            return 'Please fill in your comment'
        }
        return ''
    }
}