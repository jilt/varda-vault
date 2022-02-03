import React from 'react'
import Uplocker from './Uplocker.js'

const Storage = ({ straw, locknftId, onAdd }) => {
	return (
	<div>
		{straw.filter(lock => lock.name.match(new RegExp(locknftId, "i"))).length == 0 ? 
		<Uplocker locknftId={locknftId} onAdd={onAdd}/> 
		: 
		<div>
			<h2>Unlockable Content</h2>{straw.filter(lock => lock.name.match(new RegExp(locknftId, "i")))
			.map(lockable =>
			<>
				{lockable.CID.length > 0 ? <button><a href={`https://${lockable.CID}.ipfs.dweb.link`} target="_blank" title="your locked content" alt="your locked content">Get unlockable</a></button> 
				: <button><a href={lockable.link} target="_blank" title="your locked content" alt="your locked content">Get unlockable</a></button>}
			</>
			)
		}
		<h6> This content is for Owners only.</h6>
		</div>}
	</div>
	)
}
export default Storage