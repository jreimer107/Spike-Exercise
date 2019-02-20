import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../store/actions/assignmentActions';

class CreateCourse extends Component {
	state = {
		name: '',
		description: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.createCourse(this.state);
	};

	render() {
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='white'>
					<div className='input-field'>
						<label htmlFor='text'>New Course Name</label>
						<input
							type='text'
							id='name'
							onChange={this.handleChange}
						/>
					</div>
					<div className='input-field'>
						<textarea
							className='materialize-textarea'
							id='description'
							cols='30'
							rows='10'
							onChange={this.handleChange}
						/>
						<label htmlFor='textarea1'>Description</label>
					</div>
					<div className='input-field'>
						<button className='btn btn-primary lighten-1 z-depth-0'>
							Create
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createCourse: course => dispatch(createCourse(course))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(CreateCourse);
