import React, { Component } from 'react';
import CourseSelect from './CourseSelect';
import AssignmentSelect from './AssignmentSelect';
import { connect } from 'react-redux';
import GradeDropdown from './GradeDropdown';
import { rateAssignment } from '../../store/actions/assignmentActions';
class Selection extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const { displayedAssignment, rating } = this.props;

        //Convert letter grade to number grade
        let intRating;
        if (rating === 'A') intRating = 4;
        else if (rating === 'B') intRating = 3;
        else if (rating === 'C') intRating = 2;
        else if (rating === 'D') intRating = 1;
        else intRating = 0;

        //Increment rating count
        const newCount = displayedAssignment.count + 1;

        //Calculate new average
        console.log(intRating, displayedAssignment.grade, newCount);
        const newRating =
            (displayedAssignment.grade * displayedAssignment.count +
                intRating) /
            newCount;
        this.props.rateAssignment(displayedAssignment, newRating, newCount);
    };

    render() {
        return (
            <div className='container'>
                <form
                    className='white'
                    id='rate-assignment-form'
                    onSubmit={this.handleSubmit}
                >
                    <CourseSelect />
                    {this.props.displayedCourse ? <AssignmentSelect /> : null}
                    {this.props.displayedAssignment ? <GradeDropdown /> : null}
                    {this.props.displayedAssignment && this.props.rating ? (
                        <div className='input-field'>
                            <button className='btn btn-primary lighten-1 z-depth-0'>
                                Rate!
                            </button>
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
        rating: state.assignment.rating,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        rateAssignment: (assignment, newRating, newCount) =>
            dispatch(rateAssignment(assignment, newRating, newCount)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Selection);
