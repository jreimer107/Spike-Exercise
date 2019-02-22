import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayedAssignment } from '../../store/actions/assignmentActions';
import { getFirestore } from 'redux-firestore';

class AssignmentSelect extends Component {
	handleClick = e => {
		this.props.switchDisplayedAssignment(
			this.props.assignments.find(x => x.id === e.target.id)
		);
	};

	render() {
		const {
			displayedAssignment,
			displayedCourse,
			assignments
		} = this.props;

		const assignmentObj = displayedAssignment
			? assignments.find(x => x.id === displayedAssignment.id)
			: null;

		return (
			<div className='container'>
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
						{assignmentObj.name || 'Select Assignment'}
					</button>
					<div
						className='dropdown-menu'
						aria-labelledby='dropdownMenu2'
					>
						{/* Dropdown elements. Displays elements that belong to selected course */}
						{assignments &&
							assignments
								.filter(
									x =>
										x.course ===
										this.props.displayedCourse.name
								)
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
					{this.props.displayedAssignment ? (
						<h5>
							{assignmentObj.grade}
							{assignmentObj.letterGrade}
						</h5>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		displayedAssignment: state.assignment.displayedAssignment,
		assignments: state.firestore.ordered.assignments
	};
};

const mapDispatchToProps = dispatch => {
	return {
		switchDisplayedAssignment: displayedAssignment =>
			dispatch(switchDisplayedAssignment(displayedAssignment))
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect([{ collection: 'assignments' }])
)(AssignmentSelect);
