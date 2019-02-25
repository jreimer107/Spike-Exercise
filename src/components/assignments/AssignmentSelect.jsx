import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayedAssignment } from '../../store/actions/assignmentActions';

class AssignmentSelect extends Component {
	//When assignment dropdown option is clicked, it becomes the 'displayed assignment'
	handleClick = e => {
		this.props.switchDisplayedAssignment(
			this.props.assignments.find(x => x.id === e.target.id),
		);
	};

	render() {
		//Destructure props to simplify
		const {
			displayedAssignment,
			displayedCourse,
			assignments,
		} = this.props;

		//Get reference to displayed assignment object in firebase
		const assignmentObj = displayedAssignment
			? assignments.find(x => x.id === displayedAssignment.id)
			: null;

		return (
			<div className='container inline-flex row'>
				<div className='dropdown'>
					{/* Container for dropdown element. When not focused, shows selected assignment's name*/}
					<button
						className='btn btn-info dropdown-toggle m-2'
						type='button'
						id='dropdownMenu2'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						{/* Display name of currently selected assignment. if none, display 'select assignment' */}
						{assignmentObj
							? assignmentObj.name
							: 'Select Assignment'}
					</button>
					<div
						className='dropdown-menu'
						aria-labelledby='dropdownMenu2'
					>
						{/* Dropdown elements. Displays elements that belong to selected course */}
						{assignments &&
							displayedCourse &&
							assignments
								.filter(x => x.course === displayedCourse.id)
								.map(assignment => {
									return (
										<button
											className='dropdown-item'
											type='button'
											onClick={this.handleClick}
											key={assignment.id}
											id={assignment.id}
										>
											{assignment.name}
										</button>
									);
								})}
					</div>
					{/* Display number and lettergrades of selected assignment */}
					{assignmentObj ? (
						<h6>
							{'Assignment Grade: '}
							{assignmentObj.grade.toFixed(2)}{' '}
							{assignmentObj.letterGrade}
						</h6>
					) : null}
				</div>
			</div>
		);
	}
}

//Need to access ids of displayed course for reading
//displayed assignment for reading and writing
//assignments for reading
const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		displayedAssignment: state.assignment.displayedAssignment,
		assignments: state.firestore.ordered.assignments,
	};
};

//Dispatch action to switch displayed assignment
const mapDispatchToProps = dispatch => {
	return {
		switchDisplayedAssignment: displayedAssignment =>
			dispatch(switchDisplayedAssignment(displayedAssignment)),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	firestoreConnect([{ collection: 'assignments' }]),
)(AssignmentSelect);
