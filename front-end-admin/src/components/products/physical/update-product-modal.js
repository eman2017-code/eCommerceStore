import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";


class UpdateProductModal extends Component {
		
	constructor(props) {
			super(props);
	}

	render() {

		return (
			<Modal open={this.props.open} onClose={this.props.closeModal}>
				<div className="modal-header">
					<h5
						className="modal-title f-w-600"
						id="exampleModalLabel2"
					>
						Add Physical Product
					</h5>
				</div>
				<div className="modal-body">
					<form>
						<div className="form-group">
							<label
								htmlFor="recipient-name"
								className="col-form-label"
							>
								Category Name :
							</label>
							<input type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label
								htmlFor="message-text"
								className="col-form-label"
							>
								Category Image :
							</label>
							<input
								className="form-control"
								id="validationCustom02"
								type="file"
							/>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
					>
						Save
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						onClick={this.props.closeModal}
					>
						Close
					</button>
				</div>
			</Modal>
		)
	}
}

export default UpdateProductModal;

