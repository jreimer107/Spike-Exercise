import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayedAssignment } from '../../store/actions/assignmentActions';
import RateAssignment from './RateAssignment';

class AssignmentSelect extends Component {
	handleClick = e => {
		this.props.switchDisplayedAssignment(
			this.props.assignments.find(x => x.id === e.target.id)
		);
	};

	render() {
		return (
			<div className='container'>
				<div className='dropdown'>
					<button
						className='btn btn-info dropdown-toggle m-2'
						type='button'
						id='dropdownMenu2'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						{this.props.displayedAssignment.name ||
							'Select Assignment'}
					</button>
					<div
						className='dropdown-menu'
						aria-labelledby='dropdownMenu2'
					>
						{this.props.assignments &&
							this.props.assignments.map(assignment => {
								if (
									this.props.displayedCourse.name !==
									assignment.course
								) {
									return null;
								}
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
