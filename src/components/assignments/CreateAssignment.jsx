import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAssignment } from '../../store/actions/assignmentActions';
import GradeDropdown from './GradeDropdown';

class CreateAssignment extends Component {
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.createAssignment({
			...this.state,
			course: this.props.displayedCourse
		});
		document.getElementById('create-assignment-form').reset();
	};

	render() {
		return (
			<div className='container'>
				<h5>Create New Assignment</h5>
				<form
					onSubmit={this.handleSubmit}
					className='white'
					id='create-assignment-form'
				>
					<div className='input-field'>
						<label htmlFor='text'>Name</label>
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
						<GradeDropdown />
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

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createAssignment: assignment => dispatch(createAssignment(assignment))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAssignment);
