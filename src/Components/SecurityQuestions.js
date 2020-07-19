import React, { Component } from 'react'
import { getUserDetails } from './UserFunctions'

class SecurityQuestions extends Component {

    constructor() {
        super()
        this.state = {
            names: []
        }

    }
    componentDidMount() {
      
    }

    render() {
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


export default Profile