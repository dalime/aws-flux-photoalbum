import React, { Component } from 'react';

export default class FileUploader extends Component {
  constructor() {
    super();

    this.state = {
      file: '',
      imagePreviewUrl: ''
    }

    this._onSubmit = this._onSubmit.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.addPhoto(this.state.file);
  }

  _onInputChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let ImagePreview = imagePreviewUrl && <img src={imagePreviewUrl} />

    return (
      <div>
        <form onSubmit={this._onSubmit} className="form-group">
          <input type="file" name="image" onChange={this._onInputChange} className="form-control"/>
          <button className="btn btn-success">Upload</button>
        </form>
        {ImagePreview}
      </div>
    )
  }
}
