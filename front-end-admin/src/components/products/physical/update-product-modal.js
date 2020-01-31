import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";


class UpdateProductModal extends Component {
		
	constructor(props) {
			super(props);

			this.state = {
				product: this.props.product,
				name: this.props.product.name,
				model: this.props.product.model,
				price: this.props.product.price,
				manufacturer: this.props.product.manufacturer,
				description: this.props.product.description
			}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const { product, name, model, price, manufacturer, description } = this.state;

		console.log('product:', product);

		// creates the FormData object for sending the form data to express
    const productData = new FormData();
    // productData.append('file', this.state.image, this.state.image.name);
    productData.append('name', name);
    productData.append('model', model);
    productData.append('price', price);
    productData.append('manufacturer', manufacturer);
    productData.append('description', description);
    productData.append('upc', product.upc);
		productData.append('sku', product.sku);
		
		await this.props.updateProduct(productData, product.upc);
		this.props.closeModal();
	}

	render() {
		const { product, name, model, price, manufacturer, description } = this.state;

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
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label
								htmlFor="product-name"
								className="col-form-label">
								Name:
							</label>
							<input type="text"
										 name="name"
										 className="form-control" 
										 value={name}
										 onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-model"
								className="col-form-label">
								Model:
							</label>
							<input type="text"
										 name="model"
										 className="form-control" 
										 value={model}
										 onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-price"
								className="col-form-label">
								Price:
							</label>
							<input type="number"
										 name="price"
										 className="form-control" 
										 value={price}
										 onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<label
								htmlFor="product-manufacturer"
								className="col-form-label">
								Manufacturer:
							</label>
							<input type="text"
										 name="manufacturer"
										 className="form-control" 
										 value={manufacturer}
										 onChange={this.handleChange}/>
						</div>
						<div className="form-group row">
							<label className="col-xl-3 col-sm-4">
								Description:
							</label>
							<div className="col-xl-8 col-sm-7 description-sm">
								<textarea
									value={description}
									name="description"
									onChange={this.handleChange}>
								</textarea>
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
						<button
							type="submit"
							className="btn btn-primary">
							Save
						</button>
					</form>
				</div>
				<div className="modal-footer">
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

