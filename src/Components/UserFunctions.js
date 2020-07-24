import axios from 'axios'

//https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1

export const register = newUser => {
    return axios.post('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/securityquestions/add', {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        question1: newUser.question1,
        question2: newUser.question2,
        question3: newUser.question3,
        answer1: newUser.answer1,
        answer2: newUser.answer2,
        answer3: newUser.answer3
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const checkIfUserExist = email=>{
    return axios.post('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/userExists',{
    email: email
    }).then(res => {
        console.log(res.data)
        return res.data
        
    }).catch(err => {
        console.log(err)
    })
}

export const DataProcessingApi = formData => {
    return axios.post("https://dataprocessingapi-bzedu2xpga-uc.a.run.app/uploadfiles", formData, {
    }).then(res => {
        return res.data
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
