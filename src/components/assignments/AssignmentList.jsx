import React from 'react';

const AssignmentList = ({ assignments }) => {
	return (
		<div className='assignment-list section'>
			{assignments &&
				assignments.map(assignment => {
					return (
						<h2 key={assignment.id}>
							{assignment.name} {assignment.average}
						</h2>
					);
				})}
		</div>
	);
};
export default AssignmentList;
