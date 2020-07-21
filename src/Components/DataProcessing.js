import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'

class DataProcessing extends Component{
    constructor()
    {
    super()
    this.state ={
        
    }
}
cancel()
{
    this.props.history.push("/")
}

render()
{
    return(
        <div className="paneldesign">
        <form noValidate onSubmit={this.onSubmit}>
                    <h2 className="h3 mb-3 font-weight-normal text-center">
                        Please upload files to process
                                         </h2>
                    <div className="form-group">
                        <input type="file" multiple/>
                    </div>
                    <div className="form-group">
                    <button type="submit"
                        className="btn btn-md btn-primary btn-block" onSubmit={this.onSubmit}>
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