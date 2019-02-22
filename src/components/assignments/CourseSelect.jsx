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
            this.props.courses.find(x => x.id === e.target.id),
        );
    };

    render() {
        const { displayedCourse, courses } = this.props;
        const courseObj = displayedCourse
            ? courses.find(x => x.id === displayedCourse.id)
            : null;
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
    };
};

//Dispatch actions to switch displayed course and assignment
const mapDispatchToProps = dispatch => {
    return {
        switchDisplayedCourse: displayedCourse =>
            dispatch(switchDisplayedCourse(displayedCourse)),
        switchDisplayedAssignment: displayedAssignment =>
            dispatch(switchDisplayedAssignment(displayedAssignment)),
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    firestoreConnect([{ collection: 'courses' }]),
)(CourseSelect);
