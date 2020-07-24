import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DataProcessing extends Component {
    constructor() {
        super()
        this.state = {
            fileList: null
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange = (e) => {
        this.setState({
            fileList: e.target.files
        })


    }
    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        for (const key of Object.values(this.state.fileList)) {
            formData.append('files', key);
        }
        console.log(formData.getAll('files'))
    }
    cancel() {
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="paneldesign">
                <form noValidate onSubmit={this.onSubmit}>
                    <h2 className="h3 mb-3 font-weight-normal text-center">
                        Please upload files to process
                                         </h2>
                    <div className="form-group">
                        <input type="file" onChange={this.onChange} multiple />
                    </div>
                    <div className="form-group">
                        <button type="submit"
                            className="btn btn-md btn-primary btn-block" onClick={this.onSubmit}>
                            Upload
                            </button>
                        <Link to="/">
                            <button type="submit"
                                className="btn btn-md btn-dark btn-block">
                                Cancel
                            </button></Link>
                    </div>
                </form>
            </div>
        )

    }
}

export default DataProcessing
