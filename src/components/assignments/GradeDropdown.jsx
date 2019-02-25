import React, { Component } from 'react';

class GradeDropDown extends Component {
	state = {
		letterGrade: '',
	};

	handleClick = e => {
		this.setState({
			letterGrade: e.target.id,
		});
		this.props.handleClick(e.target.id);
	};

	render() {
		return (
			<div className='container inline-flex row'>
				<div className='btn-group'>
					<div className='input-field'>
						<div className='dropdown'>
							<button
								className='btn btn-info dropdown-toggle'
								type='button'
								id='dropdownMenu2'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								{this.state.letterGrade || 'Select Grade'}
							</button>
							<div
								className='dropdown-menu'
								aria-labelledby='dropdownMenu2'
							>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='A+'
								>
									A+
								</button>
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
									id='A-'
								>
									A-
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='B+'
								>
									B+
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
									id='B-'
								>
									B-
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='C+'
								>
									C+
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
									id='C-'
								>
									C-
								</button>
								<button
									className='dropdown-item'
									type='button'
									onClick={this.handleClick}
									id='D+'
								>
									D+
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
									id='D-'
								>
									D-
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

export default GradeDropDown;
