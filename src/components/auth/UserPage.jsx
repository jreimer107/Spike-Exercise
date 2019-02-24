import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class UserPage extends Component {
	state = {
		currSemesterName: '',
		currSemester: '',
		currCourses: [],
		currAssignments: [],
	};

	handleClick = e => {
		//Destructure arguments
		const {
			profile: { semesters },
			courses,
			assignments,
		} = this.props;

		//Update state info based on selected semester
		const currSemsterName = e.target.id;
		const currSemester = semesters[currSemsterName];

		//Filter courses by those who have ids matching those in the semester's list
		const currCourses = courses.filter(course =>
			Object.values(currSemester).find(
				courseID => course.id === courseID,
			),
		);

		//Filter assignments by those who belong to a course in currentCourses
		const currAssignments = assignments.filter(assignment =>
			currCourses.find(course => course.id === assignment.course),
		);

		//Update state with updated info
		this.setState({
			currSemesterName: currSemsterName,
			currSemester: currSemester,
			currCourses: currCourses,
			currAssignments: currAssignments,
		});
	};

	render() {
		const { profile, courses } = this.props;
		const {
			currSemesterName,
			currSemester,
			currCourses,
			currAssignments,
		} = this.state;
		const { semesters } = profile;

		return (
			<div className='container'>
				<h5>
					{profile.firstName} {profile.lastName}'s Profile
				</h5>
				{/* semester dropdown */}
				{profile.semesters ? (
					<div className='dropdown'>
						<button
							className='btn btn-info dropdown-toggle m-2'
							type='button'
							id='dropdownMenu2'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							{currSemesterName
								? currSemesterName
								: 'Select Semester'}
						</button>
						{/* Dropdown elements */}
						<div
							className='dropdown-menu'
							aria-labelledby='dropdownMenu2'
						>
							{Object.keys(semesters).map(semester => {
								return (
									<button
										className='dropdown-item'
										type='button'
										onClick={this.handleClick}
										key={semester}
										id={semester}
									>
										{semester}
									</button>
								);
							})}
						</div>
					</div>
				) : null}
				{/* display current courses and assignments based on current semester */}
				{currSemesterName ? (
					<div className='currents'>
						{/* Display list of current courses */}
						<div className='current-courses-list'>
							<h5>Current Courses</h5>
							{currCourses.map(course => (
								<p key={course.id}>{course.name}</p>
							))}
						</div>
						{/* display list of current assignments */}
						<div className='current-assignemtnts-list'>
							<h5>Current Assignments</h5>
							{currAssignments.map(assignment => (
								<p key={assignment.id}>{assignment.name}</p>
							))}
						</div>
					</div>
				) : null}
				{/* form for adding additional semesters */}
				
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		courses: state.firestore.ordered.courses,
		assignments: state.firestore.ordered.assignments,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(['courses', 'assignments']),
)(UserPage);
