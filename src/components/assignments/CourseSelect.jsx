import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayedCourse } from '../../store/actions/assignmentActions';
import { switchDisplayedAssignment } from '../../store/actions/assignmentActions';

class CourseSelect extends Component {
	handleClick = e => {
		this.props.switchDisplayedAssignment('');
		this.props.switchDisplayedCourse(
			this.props.courses.find(x => x.id === e.target.id)
		);
		console.log('new displayed course', this.props.displayedCourse);
	};

	render() {
		const { displayedCourse, courses, assignments } = this.props;
		const courseObj = displayedCourse
			? courses.find(x => x.id === displayedCourse.id)
			: null;

		//Calculate overall class grade
		let courseGrade = 0;
		let assignmentCount = 0;
		if (courseObj) {
			assignments
				.filter(assignment => assignment.course === courseObj.id)
				.forEach(assignment => {
					courseGrade += assignment.grade;
					assignmentCount++;
				});
			courseGrade /= assignmentCount;
		}

		return (
			<div className='container'>
				<div className='dropdown'>
					{/* dropdown menu containing existing classes */}
					<button
						className='btn btn-info dropdown-toggle m-2'
						type='button'
						id='dropdownMenu2'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						{courseObj ? courseObj.name : 'Select Course'}
					</button>
					{courseGrade ? (
						<h5>Course Grade: {courseGrade.toFixed(2)}</h5>
					) : null}
					<div
						className='dropdown-menu'
						aria-labelledby='dropdownMenu2'
					>
						{courses &&
							courses.map(course => {
								return (
									<button
										className='dropdown-item'
										type='button'
										onClick={this.handleClick}
										key={course.id}
										id={course.id}
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

//props
//need to read and write displayed course
//need to write (reset) displayed course
//need to read firebase collection of courses to display
const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		displayedAssignment: state.assignment.displayedAssignment,
		courses: state.firestore.ordered.courses,
		assignments: state.firestore.ordered.assignments
	};
};

//Dispatch actions to switch displayed course and assignment
const mapDispatchToProps = dispatch => {
	return {
		switchDisplayedCourse: displayedCourse =>
			dispatch(switchDisplayedCourse(displayedCourse)),
		switchDisplayedAssignment: displayedAssignment =>
			dispatch(switchDisplayedAssignment(displayedAssignment))
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect([{ collection: 'courses', collection: 'assignments' }])
)(CourseSelect);
