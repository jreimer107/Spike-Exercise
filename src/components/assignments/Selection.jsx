import React, { Component } from 'react';
import CourseSelect from './CourseSelect';
import AssignmentSelect from './AssignmentSelect';
import { connect } from 'react-redux';
import GradeDropdown from './GradeDropdown';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

class Selection extends Component {
	state = {
		userGrade: ''
	};

	handleClick = letterGrade => {
		this.setState({
			userGrade: letterGrade
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { displayedAssignment, assignments } = this.props;
		const assignmentObj = assignments.find(
			x => x.id === displayedAssignment.id
		);
		const { userGrade } = this.state;

		//Convert letter grade to number grade
		let intGrade;
		if (userGrade === 'A+') intGrade = 4;
		else if (userGrade === 'A') intGrade = 3.8;
		else if (userGrade === 'A-') intGrade = 3.5;
		else if (userGrade === 'B+') intGrade = 3.3;
		else if (userGrade === 'B') intGrade = 3.0;
		else if (userGrade === 'B-') intGrade = 2.7;
		else if (userGrade === 'C+') intGrade = 2.3;
		else if (userGrade === 'C') intGrade = 2.0;
		else if (userGrade === 'C-') intGrade = 1.7;
		else if (userGrade === 'D+') intGrade = 1.3;
		else if (userGrade === 'D') intGrade = 1.0;
		else if (userGrade === 'D-') intGrade = 0.7;
		else intGrade = 0;

		//Increment grade count
		const newCount = assignmentObj.count + 1;

		//Calculate new average
		const newIntGrade =
			(assignmentObj.grade * assignmentObj.count + intGrade) / newCount;

		//Calculate new letter grade
		var newLetterGrade;
		if (newIntGrade >= 3.8) newLetterGrade = 'A+';
		else if (newIntGrade >= 3.5) newLetterGrade = 'A';
		else if (newIntGrade >= 3.3) newLetterGrade = 'A-';
		else if (newIntGrade >= 3.0) newLetterGrade = 'B+';
		else if (newIntGrade >= 2.7) newLetterGrade = 'B';
		else if (newIntGrade >= 2.3) newLetterGrade = 'B-';
		else if (newIntGrade >= 2.0) newLetterGrade = 'C+';
		else if (newIntGrade >= 1.7) newLetterGrade = 'C';
		else if (newIntGrade >= 1.3) newLetterGrade = 'C-';
		else if (newIntGrade >= 1.0) newLetterGrade = 'D+';
		else if (newIntGrade >= 0.7) newLetterGrade = 'D';
		else if (newIntGrade >= 0.3) newLetterGrade = 'D-';
		else newLetterGrade = 'F';

		//Send user grade to server
		const firestore = getFirestore();
		firestore
			.collection('assignments')
			.doc(displayedAssignment.id)
			.update({
				grade: newIntGrade,
				count: newCount,
				letterGrade: newLetterGrade
			});
	};

	render() {
		const { displayedAssignment, displayedCourse, auth } = this.props;
		return (
			<div className='container'>
				<form
					className='white'
					id='rate-assignment-form'
					onSubmit={this.handleSubmit}
				>
					<CourseSelect />
					{displayedCourse ? <AssignmentSelect /> : null}
					{displayedAssignment && auth.uid ? (
						<div>
							<GradeDropdown handleClick={this.handleClick} />
							<div className='input-field'>
								<button className='btn btn-primary lighten-1 z-depth-0'>
									Rate!
								</button>
							</div>
						</div>
					) : null}
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		displayedAssignment: state.assignment.displayedAssignment,
		assignments: state.firestore.ordered.assignments,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'assignments' }])
)(Selection);
