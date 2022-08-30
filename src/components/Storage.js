import React from 'react'
import Uplocker from './Uplocker.js'
import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Web3Storage, getFilesFromPath } from 'web3.storage/dist/bundle.esm.min.js'

const Storage = ({ straw, locknftId, onAdd }) => {
	const[loading, setLoading] = useState(false)
	//set web3.storage API token
  
	const web3Token = process.env.WEB3TOKEN
	const relay = process.env.RELAY
  
	// Create default storage client
  
	function makeStorageClient() {
		return new Web3Storage({ token: web3Token })
	}

	// delete unlockable
	
	 const deleteUnlock = async (id) => {
		await fetch(`${relay}${locknftId}`, {
			method: 'DELETE',
		})
		var delUnlock = [... straw];
		var due = delUnlock.findIndex(lock => lock.id == locknftId)
		if (due !== -1) {
			delUnlock.splice(due, 1);
		}
		const blob = new Blob([JSON.stringify(delUnlock)], {type : 'application/json'})
	
		const files = [
		new File( [blob], 'root.json')
		]
		setLoading(!loading)
		
	//	const client = makeStorageClient()
	//	return client.put(files)
	}
 
	return (
	<div>
		{straw.filter(lock => lock.id.match(new RegExp(locknftId, "i"))).length == 0 ? 
		<Uplocker locknftId={locknftId} onAdd={onAdd}/> 
		: 
		<div>
			<h2>Unlockable Content</h2>{straw.filter(lock => lock.id.match(new RegExp(locknftId, "i")))
			.map(lockable =>
			<>
				{lockable.CID.length > 0 ? <button><a href={`https://${lockable.CID}.ipfs.dweb.link`} target="_blank" title="your locked content" alt="your locked content">Get unlockable</a></button> 
				: <button><a href={lockable.link} target="_blank" title="your locked content" alt="your locked content">Get unlockable</a></button>}
				<br /><br /><button><a href={`https://filecoin-dlubh5ly6a-uc.a.run.app/owners/${lockable.id}`} target="_blank" title="API request for ownership" alt="API request for ownership">API to get owners</a></button><br />
				<br />Please check <a title="Gaming API docs" alt="Gaming API docs" target="_blank" href="https://jilt.github.io/Vault-API-Filecoin/">here</a> the other API features available.
				<br /><br /><button><a onClick={() => deleteUnlock()} title="delete your locked content" alt="delete your locked content">Delete Unlockable</a></button>
			</>
			)
		}
		</div>}
	</div>
	)
}
export default Storage
