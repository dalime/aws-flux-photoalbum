import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { browserHistory } from 'react-router';

import UserActions from '../../actions/UserActions';

export default class EditPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      showModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._editPhoto = this._editPhoto.bind(this);
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  _onInputChange(e) {
    e.preventDefault();
    this.setState({url: e.target.value})
  }

  _editPhoto(e) {
    e.preventDefault();
    UserActions.editPhoto(this.props.id, this.state.url);
    this.setState({url: ''});
    this.closeModal();
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal} className="btn btn-primary">Edit</button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
          <Modal.Title>Edit Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>New URL: <input type="text" onChange={this._onInputChange}/></label>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._editPhoto}>Edit</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
