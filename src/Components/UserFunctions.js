import axios from 'axios'



export const register = newUser => {
    return axios.post('https://registerservice-bzedu2xpga-de.a.run.app/register', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        selectTopic: newUser.selectTopic
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const getUserDetails = () => {
    return axios.get('https://landingservice-bzedu2xpga-de.a.run.app/getUserDetails').then(result => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}
export const login = user => {

    return axios.post('https://loginservice-bzedu2xpga-de.a.run.app/login', {
        email: user.email,
        password: user.password
    }).then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const loggedout = () => {
    return axios.put('https://landingservice-bzedu2xpga-de.a.run.app/logout', {
        email: localStorage.getItem('user')
    }).then(res => {
        console.log('logout')
    })
}
