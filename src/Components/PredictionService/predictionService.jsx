import React, { Component } from "react";
import axios from "axios";
import ReactS3 from "react-s3";
import { Link, withRouter } from "react-router-dom"
import { Card, CardGroup } from "react-bootstrap";

const s3BucketConfig =  {
  bucketName: 'prediction-service-catalog',
  region: 'us-east-1',
  accessKeyId: 'ASIAXVGEXXIUVJVFRIG3',
  secretAccessKey: 'ps/hgosU6+EyuTNj6Bu7IhHtoBw1LX1RUjSrDWH1'
}

class PredictionService extends Component {

  state = {
    files: [],
    contents: [],
    predResults: [],
    titles: [], 
    uploaded: false,
    groupedFiles: []
  }

  cancelFilesHandler = (e) => {
    this.fileInput.value = "";
    this.setState({
      files: []
    })
    e.preventDefault();
  }

  groupByCluster(data){
    var predResults = data['results']
    var clusters = {};
    for (var i = 0; i < predResults.length; i++) {
      var clusterName = predResults[i].cluster;
      if (!clusters[clusterName]) {
        clusters[clusterName] = [];
      }
      clusters[clusterName].push(predResults[i].title);
    }
    var predResults = [];
    for (var clusterName in clusters) {
      predResults.push({cluster: clusterName, title: clusters[clusterName]});
    }
    this.setState({
      groupedFiles: predResults
    })
  }

  async sendPredictionRequest(data) {
    axios.post("https://us-central1-pelagic-media-276804.cloudfunctions.net/predictionService", data)
      .then(res => {
        let data = res.data
        console.log(data)
        this.groupByCluster(data)
      }).catch(err => {
        console.log(err);
      })
  }

  predictionResults = (event) => {
      event.preventDefault();
      const data = { "username": "user" }
      this.sendPredictionRequest(data)
    }

  handleFilesUpload = (event) => {
    event.preventDefault();
    const filesArray = event.target.files;
    const contents = []
    const titles = [] 
    for(let i=0; i< filesArray.length;i++) {
      titles.push(filesArray[i].name);
      var reader = new FileReader();
      reader.readAsText(filesArray[i], "UTF-8");
      reader.onload = function (evt) {
          contents.push(evt.target.result); 
      }
      reader.onerror = function (evt) {
          document.getElementById("fileContents").innerHTML = "error reading file";
      }
    }
    this.setState({ files: filesArray, contents: contents, titles: titles })
  }

  async sendCloudFunctionUploadRequest(data) {
    axios.post("https://us-central1-pelagic-media-276804.cloudfunctions.net/uploadFileService", data)
      .then(res => {
        console.log(res.data);
        this.setState({
          uploaded: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const user = localStorage.getItem('user')
    const data = { "files": this.state.contents , "titles": this.state.titles, "username": user }
    this.sendCloudFunctionUploadRequest(data);
    // if(localStorage.getItem('user') !== undefined) {

    // } else {
    //   const data = { "files": this.state.contents , "titles": this.state.titles, "username": "user" }
    //   this.sendCloudFunctionUploadRequest(data);
    // }
  }

  render() {
    const { uploaded, groupedFiles } = this.state;
    return (
      <div className="paneldesign">
      <form noValidate onSubmit={this.submitHandler}>
          <h2 className="h3 mb-3 font-weight-normal text-center">
                Please upload files in .txt format
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
                  {
                    uploaded === true ? (
                        <div className="form-group">
                              <h2>Generate Predictions</h2>
                              <button type="submit"
                                    className="btn btn-md btn-dark btn-block" onClick={ (e) => this.predictionResults(e) }>
                                    Predict File Categories
                              </button>
                        </div>
                      ) : null
                  }
                  {
                    groupedFiles.length !== 0 ? (
                            groupedFiles.map((item, index) => {
                              return <CardGroup style={{ marginBottom:'15px'}}>
                                      <Card key={index}>
                                  <Card.Header>Cluster: {item.cluster}</Card.Header>
                                      <Card.Body>
                                        <Card.Title>Files in a single cluster</Card.Title>
                                        <ul>
                                            { item.title.map(( el, ind ) => {
                                                return <li key={el}>{item.title[ind]}</li>
                                            })
                                          }
                                        </ul>
                                      </Card.Body>
                                </Card>
                                </CardGroup>
                            })
                    ) : null
                  }
              </div>

    );
  }
}

export default PredictionService;
