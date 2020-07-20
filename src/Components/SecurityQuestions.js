import React, { Component } from 'react'
import { getUserDetails } from './UserFunctions'

class SecurityQuestions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            securityqa: [],
            'question1': 'what is your mother maiden name?',
            'answer1': '',
            'question2': 'what is your mother maiden name?',
            'answer2': '',
            'question3': 'what is your mother maiden name?',
            'answer3': '',
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
        const errors = validate(this.state)
        if (errors.length > 0) {
            this.setState({ errors });
            setTimeout(() => { this.setState({ errors: [] }) }, 3000);
        }
        else {
            console.log('user registered')
        }
    }
    componentDidMount() {
        this.setState({
            questions: [
                { id: 'option1', name: 'what is your mother maiden name?' },
                { id: 'option2', name: 'what is the name of your first pet?' },
                { id: 'option3', name: 'what is the name of the place you like?' },
                { id: 'option4', name: 'In what town or city was your first full time job?' },
                { id: 'option5', name: 'What primary school did you attend?' },
            ]
        });
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
                        Please setup Security Questions to proceed
                        </h3>
                    <div className="form-group">
                        <label>Question 1</label>
                        <select className="form-control" defaultValue={this.state.question1}
                            value={this.state.question1} onChange={this.onChange} name="question1">
                            {questionsList}</select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="answer1"
                            placeholder="Please enter answer"
                            value={this.state.answer1}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Question 2</label>
                        <select className="form-control" defaultValue={this.state.question2}
                            value={this.state.question2} onChange={this.onChange} name="question2">
                            {questionsList}</select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="answer2"
                            placeholder="please enter answer"
                            value={this.state.answer2}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Question 3</label>
                        <select className="form-control" defaultValue={this.state.question3} onChange={this.onChange}
                            value={this.state.question3} name='question3'>
                            {questionsList}</select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="answer3"
                            placeholder="please enter answer"
                            value={this.state.answer3}
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
        )
    }
}


const validate = (state) => {
    const errors = [];
    if ((state.question1 === state.question2 || state.question1 === state.question3)
        || (state.question2 === state.question1 || state.question2 === state.question3)) {
        errors.push('please select different questions')
    }
    if (state.answer1.length === 0 || state.answer2.length == 0 || state.answer3.length == 0) {
        errors.push('Please answer all the questions')
    }

    return errors;
}


export default SecurityQuestions