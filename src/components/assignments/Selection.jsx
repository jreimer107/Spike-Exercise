import React, { Component } from 'react';
import CourseSelect from './CourseSelect';
import AssignmentSelect from './AssignmentSelect';
import { connect } from 'react-redux';
import { stat } from 'fs';
import RateAssignment from './RateAssignment';
class Selection extends Component {
	state = {};
	render() {
		return (
			<div className='container'>
				<CourseSelect />
				{this.props.displayedCourse ? <AssignmentSelect /> : null}
				{this.props.displayedAssignment ? <RateAssignment /> : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		displayedAssignment: state.assignment.displayedAssignment,
		rating: state.assignment.rating
	};
};

export default connect(mapStateToProps)(Selection);
