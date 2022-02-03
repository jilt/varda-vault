import React from 'react'

function backHome() {
    window.location.reload(false);
  }

const Loader = () => {


	return (
		<div className='loader'>
			<div className="circle-container">
				<div className="circle-content" />
				<div className="animated-block first" />
				<div className="animated-block second" />
			</div>
			<br />
			<div className='suggestion'>
				<h3>Updating immutable DB</h3>
				<p>Please wait a few seconds before... </p>
				<button onClick={backHome}>Checking Unlockable</button>
			</div>
		</div>
	)
}



export default Loader