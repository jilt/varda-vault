import React from 'react';
const List = ({ item, action, locknftId }) => {

	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://www.mintbase.io/thing/${item.id}`}
                      target="_blank"
                      className="link-preview"
                    >
                        <img className="nft-image" src={item.metadata.media} />
                        <p>{item.metadata.title}</p>
                        </a>
                        <button onClick={action} id={locknftId}>Unlock</button>

		</li>
	)
}


export default List