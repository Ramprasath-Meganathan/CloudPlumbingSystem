import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DataProcessingApi } from '../UserFunctions'

class DataProcessing extends Component {
    constructor() {
        super()
        this.state = {
            fileList: null,
            imageUrl: '',
            showWordCloud: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
    }
    onChange = (e) => {
        this.setState({
            fileList: e.target.files
        })
    }

    onImageChange = (e) => {
        this.setState({ imageUrl: this.state.imageUrl })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        for (const key of Object.values(this.state.fileList)) {
            formData.append('files', key);
        }
        DataProcessingApi(formData).then(res => {
            this.setState({ imageUrl: res })
            this.setState({ showWordCloud: true })
        }
        ).catch(err => {
            if (err) {
                console.log(err)
            }
        })

    }
    cancel() {
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="paneldesign">
                <form noValidate onSubmit={this.onSubmit}>
                    <h2 className="h3 mb-3 font-weight-normal text-center">
                        Please upload only .txt files to process
                                         </h2>
                    <div className="form-group">
                        <input type="file" onChange={this.onChange} encType="multipart/form-data" multiple />
                    </div>
                    <div className="form-group">
                        <button type="submit"
                            className="btn btn-md btn-primary btn-block" onClick={this.onSubmit} disabled={!this.state.fileList}
                        >
                            Upload
                            </button>
                        <Link to="/landing">
                            <button type="submit"
                                className="btn btn-md btn-dark btn-block">
                                Cancel
                            </button></Link>
                    </div>
                </form>
                {this.state.showWordCloud ?
                    (
                        <div className="form-group">
                            <h3 className="h3 mb-3 font-weight-normal text-center">Generated word cloud for the uploaded files is</h3>
                            <br />
                            <img src={this.state.imageUrl} onChange={this.onImageChange} alt="" />
                        </div>) : null}
            </div>

        )

    }
}




export default DataProcessing
