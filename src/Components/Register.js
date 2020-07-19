import React, { Component } from 'react'
import { register } from './UserFunctions'


class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '',
            lastname:'',
            email: '',
            password: '',
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
        const errors = validate(this.state.name, this.state.email, this.state.password)
        if (errors.length > 0) {
            this.setState({ errors });
        }
        else {
            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            }
            register(user).then(res => {
                console.log(res)
                if (res === 'User already registered') {
                    errors.push(res)
                    this.setState({ errors });
                }
                else if (res === undefined) {
                    errors.push('User already registered')
                    this.setState({ errors });
                }
                else {
                    window.alert('User Registered successfully')
                    this.props.history.push('/')
                }
            }).catch(err => {
                if (err) {
                    errors.email('something wrong with the registration')
                }
            })
        }

    }


    render() 
    {
        const { errors } = this.state;
                    return (

                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mt-5 mx-auto">
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <h1 className="h3 mb-3 front-weight-normal">
                                            Please Register
                            </h1>
                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name</label>
                                            <input type="text" className="form-control"
                                                name="firstname"
                                                placeholder="Enter first name"
                                                value={this.state.firstname}
                                                onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" className="form-control"
                                                name="lastname"
                                                placeholder="Enter last name"
                                                value={this.state.lastname}
                                                onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" className="form-control"
                                                name="email"
                                                placeholder="Enter email"
                                                value={this.state.email}
                                                onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control"
                                                name="password"
                                                placeholder="Enter password"
                                                value={this.state.password}
                                                onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmpassword">Confirm Password</label>
                                            <input type="password" className="form-control"
                                                name="confirmpassword"
                                                placeholder="Re-enter password"
                                                value={this.state.confirmpassword}
                                                onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <select defaultValue={this.state.role} onChange={this.onChange} className="form-control">
                                                <option value="aws">student</option>
                                                <option value="staff">staff</option>
                                            </select>
                                            {errors.role &&
                                                <span className='error'>{errors.role}</span>}
                                        </div>
                                        <button type="submit"
                                            className="btn btn-md btn-primary btn-block" onSubmit={this.onSubmit}>
                                            Register
                            </button>
                                        <br />
                                        {errors.map(error => (
                                            <p key={error} className='error'>Error on Page: {error}</p>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
    }


    const validate = (name, email, comment) => {
        const errors = [];
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (name.length === 0) {
            errors.push('name is required')
        }
        if (!validEmailRegex.test(email)) {
            errors.push("Email id is not valid")
        }
        if (comment.length < 1) {
            errors.push("Password should be atleast 6 characters long");
        }
        return errors;
    }

    export default Register
