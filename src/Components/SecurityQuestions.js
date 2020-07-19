import React, { Component } from 'react'
import { getUserDetails } from './UserFunctions'

class SecurityQuestions extends Component {

    constructor() {
        super()
        this.state = {
            questions:[],
            'answer1': '',
            'answer2': '',
            'answer3': '',
            role: 'student',
            errors: []
        }
        this.onChange = this.onChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        this.setState({
            questions: [
                {id: 'question1', name: 'what is your mother maiden name?'},
                {id: 'question2', name: 'what is the name of your first pet?'},
                {id: 'question3', name: 'what is the name of the place you like?'},
                {id: 'question3', name: 'In what town or city was your first full time job?'},
                {id: 'question3', name: 'What primary school did you attend?'},
            ]
        });

    }

    render() {
        const { errors } = this.state;
        const { questions } = this.state;

	let questionsList = questions.length > 0
		&& questions.map((item, i) => {
		return (
			<option key={i} value={item.id}>{item.name}</option>
		)
	}, this);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 front-weight-normal">
                                Security Questions
                        </h1>
                            <div className="form-group">
                                <label>Question 1</label>
                                <select className="form-control">
                                {questionsList}</select>
                                {/* <select defaultValue={this.state.role} onChange={this.onChange} className="form-control">
                                    <option value="aws">student</option>
                                    <option value="staff">staff</option>
                                </select> */}
                                {/* {errors.role &&
                                    <span className='error'>{errors.role}</span>} */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="answer1">Answer</label>
                                <input type="text" className="form-control"
                                    name="answer1"
                                    placeholder="Please enter answer"
                                    value={this.state.answer1}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Question 2</label>
                                <select className="form-control">
                                {questionsList}</select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmpassword">Answer</label>
                                <input type="password" className="form-control"
                                    name="confirmpassword"
                                    placeholder="please enter answer"
                                    value={this.state.confirmpassword}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Question 3</label>
                                <select className="form-control">
                                {questionsList}</select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmpassword">Answer</label>
                                <input type="password" className="form-control"
                                    name="confirmpassword"
                                    placeholder="please enter answer"
                                    value={this.state.confirmpassword}
                                    onChange={this.onChange} />
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


export default SecurityQuestions