import React from 'react';
import List from './List'

const Mintbase = ({ data }) => {


	return (
		<ul className='mintbase-listings'>
			{data.map((item) => (
				<List key={item.id} item={item} 
				/>
				))}
		</ul>
	)
}


export default Mintbase