import React from 'react'
import ListParas from './ListParas.js'

const Paras = ({ paras, action }) => {

	return (
		<ul className='paras-listings'>
			{paras.map((item) => (
				<ListParas key={item.id} item={item} action={action} locknftId={item.id}
				/>
				))}
		</ul>
	)
}


export default Paras