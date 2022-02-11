import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const List = ({ item, action, locknftId }) => {

	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://www.mintbase.io/thing/${item.id}`}
                      target="_blank"
                      className="link-preview"
                    >
                        <LazyLoadImage alt={item.metadata.title} src={item.metadata.media} width={100}/>
                        <p>{item.metadata.title}</p>
                        </a>
                        <button onClick={() => action(item.id)} >Unlock</button>

		</li>
	)
}


export default List