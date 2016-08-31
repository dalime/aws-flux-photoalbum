import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import UserActions from '../../actions/UserActions';

export default class EditAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      showModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._editAlbum = this._editAlbum.bind(this);
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  _onInputChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  _editAlbum(e) {
    e.preventDefault()
    UserActions.editAlbum(this.props.id, this.state.name);
    this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal} className="btn btn-primary">Edit Album</button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
          <Modal.Title>Edit Album</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>New Name: <input type="text" onChange={this._onInputChange}/></label>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._editAlbum}>Edit</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
