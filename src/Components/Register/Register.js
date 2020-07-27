import React, { Component } from 'react'
import { checkIfUserExist } from '../UserFunctions'


class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            role: 'student',
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
        const errors = validate(this.state.firstname, this.state.lastname, this.state.email, this.state.password, this.state.confirmpassword)
        if (errors.length > 0) {
            this.setState({ errors });
            setTimeout(() => { this.setState({ errors: [] }) }, 3000);
        }
        else {
            checkIfUserExist(this.state.email).then(res => {
                if (res === 'new user') {
                    const serializedRegisterState = JSON.stringify(this.state)
                    localStorage.setItem('registerState', serializedRegisterState)
                    this.props.history.push(`\securityquestions`)
                    this.state.firstname = ''
                    this.state.lastname = ''
                    this.state.email = ''
                    this.state.password = ''
                    this.state.confirmpassword = ''
                    this.state.role = 'student'
                    this.errors = [];
                    this.setState({ errors });

                }
                else {
                    console.log(res)
                    errors.push(res)
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
                        Please Register
                                         </h2>

                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="firstname"
                            placeholder="Enter first name"
                            value={this.state.firstname}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="lastname"
                            placeholder="Enter last name"
                            value={this.state.lastname}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
                        <input type="password" className="form-control"
                            name="confirmpassword"
                            placeholder="Re-enter password"
                            value={this.state.confirmpassword}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <select defaultValue={this.state.role} onChange={this.onChange} className="form-control" name="role">
                            <option value="student">student</option>
                            <option value="staff">staff</option>
                        </select>
                    </div>
                    <button type="submit"
                        className="btn btn-md btn-primary btn-block" onSubmit={this.onSubmit}>
                        Next
                            </button>
                    <br />
                    {errors.map(error => (
                        <p key={error} className='error'>Error on Page: {error}</p>
                    ))}
                </form>
            </div>
        )
    }
}


const validate = (firstname, lastname, email, password, confirmpassword) => {
    const errors = [];
    const validEmailRegex =
        RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (firstname.length === 0) {
        errors.push('first name is required')
    }
    if (lastname.length === 0) {
        errors.push('last name is required')
    }
    if (!validEmailRegex.test(email)) {
        errors.push("Email id is not valid")
    }
    if (password < 1) {
        errors.push("Password should be atleast 6 characters long");
    }
    if (password !== confirmpassword) {
        errors.push("Password and confirm password should match");

    }
    return errors;
}

export default Register
