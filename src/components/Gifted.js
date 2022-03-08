import React from 'react'
import ListOwned from './ListOwned.js'

const Gifted = ({ gifted, action }) => {

	return (
		<ul className='paras-listings owned'>
			{gifted.map((giftid) => (
				<ListOwned key={giftid} tokenid={giftid} action={action}
				/>
				))}
		</ul>
	)
}


export default Gifted