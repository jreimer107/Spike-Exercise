import React, { Component } from 'react';
import { connect } from 'react-redux';

class RateAssignment extends Component {
	state = {
		grade: 'Choose Grade',
		assignment: ''
	};

	handleClick = e => {
		this.setState({
			grade: e.target.id
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		// send new thing to server
	};

	render() {
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='white'>
					<h5 className='grey-text text-darken-3'>Rate Assignment</h5>
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
									{this.state.grade}
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
						<div className='input-field m-2'>
							<button className='btn btn-primary lighten-1 z-depth-0'>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default RateAssignment;
