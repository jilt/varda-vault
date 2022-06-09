import React from 'react'
import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Uplocker = ({ locknftId, onAdd }) => {
// set web3.storage API token
  
const web3Token = process.env.WEB3TOKEN

// component level states	

const [CID, setCid] = useState('')
const [link, setLink] = useState('')
// loader state
  
  const[loading, setLoading] = useState(false)
  
// form submit

const onSubmit = (e) => {
	var name = locknftId
	
	e.preventDefault()
	
	if (CID && link) {
		alert('you can add only a CID or a link')
		return
	}
	if (!CID && !link){
		alert('please add either a link or a CID to submit')
		return
	}
	
	onAdd({name ,CID ,link})
	
	setCid('')
	setLink('')
	setLoading(!loading)
}


	return (
	<div>
		<h2>Upload Unlockable</h2>
		<form id="uplock" onSubmit={onSubmit}>
			<p>You can lock content via <a href="https://web3.storage/account/" title="onchain immutable storage" alt="onchain immutable storage" target="_blank">web3.storage</a> CIDs or with a single link to your file or App, API for Apps and Games is under construction.</p>
			<p>Remember that you can lock files to your NFT only one time.</p>
			<p>
				<button><a href="https://github.com/jilt/varda-vault#readme" title="tutorial" alt="tutorial" target="_blank">Creators Guide</a></button> <button><a href="https://github.com/jilt/varda-vault#readme" title="coming soon">Check link API</a></button>
			</p>
			<div className="form-control">
				<label className="labUp">Unlockable CID</label>
				<input type="text" placeholder="file's CID here" value={CID} onChange={(e) => setCid(e.target.value)}/>
			</div>
			<br />
			<div className="form-control">
				<label className="labUp">Unlockable link</label>
				<input type="text" placeholder="https://me.io" value={link} onChange={(e) => setLink(e.target.value)}/>
			</div>
			<br />
			<input type="submit" value="Save Unlockable" className="btn uplocker" />
		</form>
		{loading && <div className="center"><CountdownCircleTimer
    isPlaying
    duration={30}
    colors="#ae84f0"
    onComplete={() => {
       window.location.reload(false)
    }}
  /></div>}
	</div>
	)
}
export default Uplocker