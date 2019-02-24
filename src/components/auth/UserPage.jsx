import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import CourseSelect from '../assignments/CourseSelect';
import { getFirestore } from 'redux-firestore';

class UserPage extends Component {
	state = {
		currSemesterName: '',
		currSemester: {},
		currCourses: [],
		currAssignments: [],
		newSemester: '',
	};

	handleSetSemester = e => {
		this.updateState(e.target.id);
	};

	handleAddCourse = () => {
		//push course into semester object
		this.state.currSemester.push(this.props.displayedCourse.id);

		this.updateFirestoreWithProfile();
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleAddSemester = e => {
		e.preventDefault();
		this.props.profile.semesters[this.state.newSemester] = [];
		this.updateFirestoreWithProfile();
		document.getElementById('create-semester-form').reset();
	};

	updateFirestoreWithProfile = () => {
		const firestore = getFirestore();
		firestore
			.collection('users')
			.doc(this.props.auth.uid)
			.update({
				...this.props.profile,
			})
			.then(this.updateState(this.state.currSemesterName)) //Refresh page so new course shows up
			.catch(err => console.log('Error updating profile', err));
	};

	updateState = currSemesterName => {
		//Destructure arguments
		const {
			profile: { semesters },
			courses,
			assignments,
		} = this.props;

		const currSemester = semesters[currSemesterName];

		//Filter courses by those who have ids matching those in the semester's list
		const currCourses = currSemester
			? courses.filter(course =>
					Object.values(currSemester).find(
						courseID => course.id === courseID,
					),
			  )
			: null;

		//Filter assignments by those who belong to a course in currentCourses
		const currAssignments = currCourses
			? assignments.filter(assignment =>
					currCourses.find(course => course.id === assignment.course),
			  )
			: null;

		//Update state with updated info
		this.setState({
			currSemesterName: currSemesterName,
			currSemester: currSemester,
			currCourses: currCourses,
			currAssignments: currAssignments,
		});
	};

	render() {
		const { profile } = this.props;
		const { currSemesterName, currCourses, currAssignments } = this.state;
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
										onClick={this.handleSetSemester}
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
							{currCourses
								? currCourses.map(course => (
										<p key={course.id}>{course.name}</p>
								  ))
								: null}
						</div>
						{/* display list of current assignments */}
						<div className='current-assignemtnts-list'>
							<h5>Current Assignments</h5>
							{currAssignments
								? currAssignments.map(assignment => (
										<p key={assignment.id}>
											{assignment.name}
										</p>
								  ))
								: null}
						</div>
						{/* form for adding courses to current semester */}
						<CourseSelect />
						<button
							className='btn btn-info m-2'
							onClick={this.handleAddCourse}
						>
							Add to Semester
						</button>
					</div>
				) : null}
				{/* form for adding additional semesters */}
				<h5>Create New Semester</h5>
				<form
					onSubmit={this.handleAddSemester}
					className='white'
					id='create-semester-form'
				>
					<div className='input-field'>
						<label htmlFor='text'>Semester Name</label>
						<input
							type='text'
							id='newSemester'
							onChange={this.handleChange}
						/>
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
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		courses: state.firestore.ordered.courses,
		assignments: state.firestore.ordered.assignments,
		displayedCourse: state.assignment.displayedCourse,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(['courses', 'assignments']),
)(UserPage);
