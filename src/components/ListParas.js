import React from 'react'

const ListParas = ({ item, action, locknftId }) => {


	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://paras.id/token/x.paras.near::${item.token_series_id}`}
                      target="_blank"
                      className="link-preview"
                    >
                        <img className="nft-image" src={`https://${item.media}.ipfs.dweb.link`} />
                        <p>{item.title}</p>
                        </a>
                        <button onClick={() => action(item.id)}>Unlock</button>

		</li>
	)
}


export default ListParas