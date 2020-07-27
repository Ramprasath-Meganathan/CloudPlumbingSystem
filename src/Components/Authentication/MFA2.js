import React, { Component } from 'react'
import { mfa2, mfaquestion } from '../UserFunctions'

class MFA2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            securityqa: [],
            
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
        
            const userDetails = JSON.parse(localStorage.getItem('loginState'))
            
            const user = {
                
                email: userDetails.email,
                password: userDetails.password,
                
                question1: this.state.question1,
               
                answer1: this.state.answer1,
              
            }
            mfa2(user).then(res => {
                console.log(res)
                if (res) {
                    console.log(res);
                    localStorage.setItem('usertoken', res)
                    window.alert('User Logged In successfully')
                    localStorage.removeItem('loginState')
                    this.props.history.push('/landing')
                }
                else{
                    window.alert('There is some error')
                }
            }).catch(err => {
                if (err) {
                    window.alert('something wrong with the registration')
                }
            })
            console.log('user logged in')
        
    }
    componentDidMount() {
        const userDetails = JSON.parse(localStorage.getItem('loginState'))
            
            const user = {
                
                email: userDetails.email,
                
            }
            mfaquestion(user).then(res => {
                console.log(res)
                
                    this.setState({
                        questions: [
                            { id: 'option1', name: res },
                            
                        ]
                    });
                
            }).catch(err => {
                if (err) {
                    window.alert('error')
                }
            })


        
    }

    render() {
        const { errors } = this.state;
        const { questions } = this.state;

        let questionsList = questions.length > 0
            && questions.map((item, i) => {
                return (
                    <option key={i} value={item.name}>{item.name}</option>
                )
            }, this);
        return (
            <div className="paneldesign">
                <form noValidate onSubmit={this.onSubmit}>
                    <h3 className="h3 mb-3 font-weight-normal">
                        Please Select and Answer the Security question to Login
                        </h3>
                    <div className="form-group">
                        <label>Question 1</label>
                        <h5 className="form-control" defaultValue={this.state.question1}
                            value={this.state.question1} onChange={this.onChange} name="question1">
                            {questionsList}</h5>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="answer1"
                            placeholder="Please enter answer"
                            value={this.state.answer1}
                            onChange={this.onChange} />
                    </div>
                    
                    <button type="submit"
                        className="btn btn-md btn-primary btn-block" onSubmit={this.onSubmit}>
                        Login
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





export default MFA2