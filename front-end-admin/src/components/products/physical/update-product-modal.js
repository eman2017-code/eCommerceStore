import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";


class UpdateProductModal extends Component {
		
	constructor(props) {
			super(props);

			this.state = {
				product: this.props.product
			}
	}

	render() {
		const product = this.state.product;

		return (
			<Modal open={this.props.open} onClose={this.props.closeModal}>
				<div className="modal-header">
					<h5
						className="modal-title f-w-600"
						id="exampleModalLabel2"
					>
						Update Product
					</h5>
				</div>
				<div className="modal-body">
					<form>
						<div className="form-group">
							<label
								htmlFor="product-name"
								className="col-form-label">
								Name:
							</label>
							<input type="text"
										 className="form-control" 
										 value={product.name}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-model"
								className="col-form-label">
								Model:
							</label>
							<input type="text"
										 className="form-control" 
										 value={product.model}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-price"
								className="col-form-label">
								Price:
							</label>
							<input type="number"
										 className="form-control" 
										 value={product.price}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-manufacturer"
								className="col-form-label">
								Manufacturer:
							</label>
							<input type="text"
										 className="form-control" 
										 value={product.manufacturer}/>
						</div>
						<div className="form-group row">
							<label className="col-xl-3 col-sm-4">
								Description:
							</label>
							<div className="col-xl-8 col-sm-7 description-sm">
								<textarea
									value={product.description}
									name="description"
								></textarea>
							</div>
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

