import axios from 'axios'
const jwt = require('jsonwebtoken')




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
export const mfaquestion = user => {
    return axios.get('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/securityquestions', {
        email: user.email
    })

    .then(function (response)
    
    {
      

      let q1,q2,q3=''
      for(const d2 of response.data){

        if(d2.data.email===user.email)
          {
            q1=d2.data.question1
           
            q2=d2.data.question2
      
            q3=d2.data.question3
        
            

          }
        
      }
      
      return (q1)
      
      

    })
    .catch(function (error) {
      console.log(error);
    });
  
}

export const mfa2 = user => {
    return axios.get('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/securityquestions', {
        email: user.email,
        question1: user.question1,
        
        answer1: user.answer1,
        
    })

    .then(function (response)
    
    {
      

        console.log(user.answer3)
      let q1,q2,q3,a1,a2,a3=''
      for(const d2 of response.data){

        if(d2.data.email ===user.email)
          {
            q1=d2.data.question1
            a1=d2.data.answer1
            q2=d2.data.question2
            a2=d2.data.answer2
            q3=d2.data.question3
            a3=d2.data.answer3

            

          }
        
      }
      console.log(a3)
      if(user.answer1 == a1 ){
        let token = jwt.sign(user.email.trim().toLowerCase(), 'secret')
        localStorage.setItem('user',user.email)
        return(token)
    
      }
      
      

    })
    .catch(function (error) {
      console.log(error);
    });
  
}


export const checkIfUserExist = email => {
    return axios.post('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/userExists', {
        email: email
    }).then(res => {
        console.log(res.data)
        return res.data

    }).catch(err => {
        console.log(err)
    })
}
//https://apisdp.herokuapp.com
export const checkIfUserAuth = user => {
    return axios.post('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/userLogin', user).then(res => {
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


export const loggedout = () => {
    console.log(localStorage.getItem('user'))
    return axios.put('https://us-central1-cloudprojects-279901.cloudfunctions.net/function-1/logout', {
        email: localStorage.getItem('user')
    }).then(res => {
        console.log('logout')
    })
}
