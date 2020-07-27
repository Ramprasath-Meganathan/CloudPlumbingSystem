import React, { Component } from 'react'
import { login, checkIfUserAuth } from '../UserFunctions'





class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
            state: 'login'
        }
        const errors = validate(this.state.email, this.state.password);
        if (errors.length > 0) {
            this.setState({ errors });
        }
        else {

            console.log('here')
            console.log(user)
            checkIfUserAuth(user).then(res => {
                if (res === 'User Verified') {
                    console.log('done')
                    const loginState = JSON.stringify(this.state)
                    localStorage.setItem('loginState', loginState)
                    localStorage.setItem('email',this.state.email)
                    this.props.history.push(`\mfa2`)
                    

                }
                else {
                    window.alert('Email or Password doesnt match')
                    errors.push("Email or Password doesn't match")
                    this.setState({ errors });
                    setTimeout(() => { this.setState({ errors: [] }) }, 3000);
                }

            })
            
        }
    }
    render() {
        const { errors } = this.state;
        return (
                    <div className="paneldesign">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h2 className="h3 mb-3 font-weight-normal text-center">
                                Please sign in
                            </h2>
                            <div className="form-group ">
                                <input type="email" className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit"
                                className="btn btn-md btn-primary btn-block" onSubmit={this.onSubmit}>
                                Sign in
                            </button>
                            {errors.map(error => (
                                <p key={error} className='error'>Error on Page: {error}</p>
                            ))}
                        </form>
                    </div>
        )
    }
}

const validate = (email, password) => {
    const errors = [];
    const validEmailRegex =
        RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    console.log(validEmailRegex.test(email))
    if (!validEmailRegex.test(email)) {
        errors.push("Email id is not valid")
    }
    if (password.length < 1) {
        errors.push("Please enter password");
    }

    return errors;
}
export default Login