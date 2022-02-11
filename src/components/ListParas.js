import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ListParas = ({ item, action, locknftId }) => {


	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://paras.id/token/x.paras.near::${item.token_series_id}`}
                      target="_blank"
                      className="link-preview"
                    >
                        <LazyLoadImage alt={item.title} src={`https://${item.media}.ipfs.dweb.link`} width={100} />
                        <p>{item.title}</p>
                        </a>
                        <button onClick={() => action(item.id)}>Unlock</button>

		</li>
	)
}


export default ListParas