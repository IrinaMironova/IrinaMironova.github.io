import React, { Component } from 'react';
import "@material/button/dist/mdc.button.min.css";
import "@material/form-field/dist/mdc.form-field.min.css";
import "@material/textfield/dist/mdc.textfield.min.css";
import './List.scss';

class List extends Component {
	render() {
		return (
			<div className="ListMain">
				<div className="header">
					<form className='mdc-form-field'onSubmit={this.props.addItem}>
						<div className="mdc-text-field homepage">
							<input className="mdc-textfield__input"
								placeholder="homepage" 
								ref={this.props.inputElement}
								value={this.props.currentItem.text}
								onChange={this.props.handleInput}
							/>
						</div>
						<div className="mdc-text-field description">
							<input className="mdc-textfield__input"
								placeholder="description" 
								ref={this.props.inputElement2}
								value={this.props.currentItem2.text}
								onChange={this.props.handleInput2}
							/>
						</div>
						<button className='mdc-button' type="submit"> Add </button>
					</form>
				</div>
			</div>
		)
	}
}

export default List;