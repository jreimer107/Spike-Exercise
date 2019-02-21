import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRating } from '../../store/actions/assignmentActions';

class GradeDropDown extends Component {
	handleClick = e => {
		this.props.changeRating(e.target.id);
	};

	render() {
		return (
			<div className='container'>
				<div className='btn-group'>
					<div className='input-field m-2'>
						<label htmlFor='grade'>Grade</label>
						<div className='dropdown'>
							<button
								className='btn btn-info dropdown-toggle'
								type='button'
								id='dropdownMenu2'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								{this.props.rating || 'Select Grade'}
							</button>
							<div
								className='dropdown-menu'
								aria-labelledby='dropdownMenu2'
							>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='A'
								>
									A
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='B'
								>
									B
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='C'
								>
									C
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='D'
								>
									D
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='F'
								>
									F
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		rating: state.assignment.rating
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeRating: rating => dispatch(changeRating(rating))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeDropDown);
