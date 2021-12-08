const List = ({ item }) => {


	return (
		<li className="NFT-image" key={item.id} >
            <a
                      href={`https://www.mintbase.io/thing/${item.id}`}
                      target="_blank"
                      class="link-preview"
                    >
                        <img class="nft-image" src={item.metadata.media} />
                        <p>{item.metadata.title}</p>
                        </a>
                        <button onClick={() => handleSetLockNftId(item.id)}>Unlock</button>

		</li>
	)
}


export default List