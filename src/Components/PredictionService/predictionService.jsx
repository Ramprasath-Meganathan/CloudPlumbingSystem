import React, { Component } from "react";
import axios from "axios";
import ReactS3 from "react-s3";
import { Link, withRouter } from "react-router-dom"


const s3BucketConfig =  {
  bucketName: 'prediction-service-catalog',
  region: 'us-east-1',
  accessKeyId: 'ASIAXVGEXXIUVJVFRIG3',
  secretAccessKey: 'ps/hgosU6+EyuTNj6Bu7IhHtoBw1LX1RUjSrDWH1'
}

class PredictionService extends Component {

  state = {
    files: [],
    names: [],
    predResults: []
  }

  uploadFilesHandler = (e) => {
    if(this.state.files) {
      const names = []
      for(let i=0; i < this.state.files.length;i++){
        const file_name = this.state.files[i].name;
        const name = file_name.replace(".txt", "");
        names.push(name);
      }
      this.setState({
        names: names
      })
      this.predictionResults(names)
    }
    // this.fileInput.value = "";
    e.preventDefault();
  }

  cancelFilesHandler = (e) => {
    this.fileInput.value = "";
    this.setState({
      files: []
    })
    e.preventDefault();
  }

  groupByCluster(names){
    let group = names.reduce((r, a) => {
     r[a.cluster] = [...r[a.cluster] || [], a];
     this.setState({
       predResults: r
     })
     return r;
    }, {});
    console.log("group", this.state.predResults);
  }

  async predictionResults(names) {
    const data = { "titles": names }
    axios.post("https://us-central1-pelagic-media-276804.cloudfunctions.net/predictionService", data)
      .then(res => {
        let data = res.data.results
        const results = []
        for(let i=0;i<data.length;i++){
          results.push({
            'cluster': data[i][0], 'title': data[i][1]
          })
        }
        this.groupByCluster(results)
      }).catch(err => {
        console.log(err);
      })
    }

  handleFilesUpload = (event) => {
    const filesArray = event.target.files
    this.setState({ files: filesArray })
    event.preventDefault();
  }

  render() {
    return (
      <div className="paneldesign">
      <form noValidate onSubmit={this.uploadFilesHandler}>
          <h2 className="h3 mb-3 font-weight-normal text-center">
                Please upload files to process
                                       </h2>
                  <div className="form-group">
                      <input type="file" id="files" name="files" multiple ref={ref=> this.fileInput = ref} onChange={ (e) => {
                          this.handleFilesUpload(e)
                        }} />
                  </div>
                  <div className="form-group">
                    <button type="submit" id="upload" name="upload"
                        className="btn btn-md btn-primary btn-block">
                        Upload
                    </button>
                    <button type="submit"
                        className="btn btn-md btn-dark btn-block" onClick={(e) => this.cancelFilesHandler(e)}>
                        Cancel
                    </button>
                  </div>
                  </form>

              </div>
    );
  }
}

export default PredictionService;
