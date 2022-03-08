import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ListOwned = ({ tokenid, action }) => {
	const[tokenlist, setTokenList] = useState([])
	async function loaData() { 
	
		var tokenraw = await fetch ("https://api.thegraph.com/subgraphs/name/jilt/parasubgraph", {
		method: "POST",
		headers:{ "content-type": "application/json" },
		body: JSON.stringify({
			query:
			'{ nftCreateSeries(where: {token_series_id: "' +
			tokenid.token_series_id +
			'"}) {id, media, title, token_series_id }}'
			}),
		})
		const tokendata = await tokenraw.json();
		const tokendatastr = JSON.stringify(tokendata);
		const tokraw = JSON.parse(tokendatastr);
		const tokenlist = tokraw.data.nftCreateSeries;
		return tokenlist;
	
	}

const getListData = async() => {
			const tokenlist = await loaData()
			setTokenList(tokenlist)
			console.log(tokenlist)
		}
		getListData()

	return (
		<li className="NFT-image">
		{tokenlist.map((tokeninfo) => (
			<>
            <a
                      href={`https://paras.id/token/x.paras.near::${tokeninfo.token_series_id}`}
                      target="_blank"
                      className="link-preview"
                    >
                        <LazyLoadImage alt={tokeninfo.title} src={`https://${tokeninfo.media}.ipfs.dweb.link`} width={100} effect="blur"/>
                        <p>{tokeninfo.title}</p>
                        </a>
                        <button onClick={() => action(tokeninfo.id)}>Unlock</button>
			</>
			))}

		</li>
		
	)
}


export default ListOwned