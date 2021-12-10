import React from 'react'
import List from './List'


const Mintbase = ({ mintbase, action }) => {


	return (
		<ul className='mintbase-listings'>
			{mintbase.map((item) => (
				<List key={item.id} item={item} action={action}
				/>
				))}
		</ul>
	)
}



export default Mintbase