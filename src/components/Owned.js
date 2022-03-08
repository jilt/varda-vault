import React from 'react'
import ListOwned from './ListOwned.js'

const Owned = ({ owned, action }) => {

	return (
		<ul className='paras-listings owned'>
			{owned.map((tokenid) => (
				<ListOwned key={tokenid} tokenid={tokenid} action={action}
				/>
				))}
		</ul>
	)
}


export default Owned