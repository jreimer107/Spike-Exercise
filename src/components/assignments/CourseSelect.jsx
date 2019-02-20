import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class CourseSelect extends Component {
	state = {
		displayedCourse: ''
	};

	handleCourseClick = e => {
		console.log(e.target);
		this.setState({
			displayedCourse: e.target.textContent
		});
	};

	render() {
		return (
			<div className='container'>
				<h5 className='grey-text text-darken-3'>Select Course</h5>
				<div className='dropdown'>
					<button
						className='btn btn-info dropdown-toggle'
						type='button'
						id='dropdownMenu2'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						{this.state.displayedCourse || 'Select Course'}
					</button>
					<div
						className='dropdown-menu'
						aria-labelledby='dropdownMenu2'
					>
						{this.props.courses &&
							this.props.courses.map(course => {
								return (
									<button
										className='dropdown-item'
										type='button'
										onClick={this.handleCourseClick}
										key={course.id}
									>
										{course.name}
									</button>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		courses: state.firestore.ordered.courses
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'courses' }, { collection: 'assignments' }])
)(CourseSelect);
