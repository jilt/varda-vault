const ListParas = ({ item }) => {


	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://paras.id/${item.owner}/collectibles`}
                      target="_blank"
                      class="link-preview"
                    >
                        <img class="nft-image" src={item.metadata.image} />
                        <p>{item.metadata.name}</p>
                        </a>
                        <button onClick={() => handleSetLockNftId(item.id)}>Unlock</button>

		</li>
	)
}


export default ListParas