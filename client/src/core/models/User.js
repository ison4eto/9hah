const usernameRegex = /^[a-zA-Z0-9]{3,20}$/
const passwordRegex = /^\S{6,20}$/


export default {
    defaultState: {
        username: '',
        password: '',
        passwordRep: ''
    },
    validateUsername: (username) => {
        if (!username) {
            return 'Username is required'
        }
        if (!username.match(usernameRegex)) {
            return 'Username must be 3 to 20 symbols and must contain only latin letters and digits'
        }
        return ''
    },
    validatePassword: (pass) => {
        if (!pass) {
            return 'Password is required'
        }
        if (!pass.match(passwordRegex)) {
            return 'Password must be 6 to 20 symbols'
        }
        return ''
    },
    validatePasswordRep: (pass, passRep) => {
        if (pass !== passRep)
            return 'Passwords should match'
        return ''
    },
    validate: ({ username, password, passwordRep }) => {
        if (!usernameRegex.test(username)) {
            return 'Username must be 3 to 20 symbols and must contain only latin letters and digits'
        }
        if (!passwordRegex.test(password)) {
            return 'Password must be 6 to 20 symbols'
        }
        if (password !== passwordRep) {
            return 'Passwords should match'
        }
        return ''
    },
    getAllErrors: ({ username, password, passwordRep }) => {
        const errors = []
        if (!usernameRegex.test(username)) {
            errors.push('Username must be 3 to 20 symbols and must contain only latin letters and digits')
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password must be 6 to 20 symbols')
        }
        if (password !== passwordRep) {
            errors.push('Passwords should match')
        }
        return errors
    }
}