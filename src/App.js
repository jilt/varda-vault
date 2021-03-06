import "regenerator-runtime/runtime"
import React, { useState } from "react"
import { login, logout } from "./utils"
import Mintbase from './components/Mintbase'
import Paras from './components/Paras'
import Owned from './components/Owned'
import Gifted from './components/Gifted'
import "./global.css"
import { Web3Storage, getFilesFromPath } from 'web3.storage/dist/bundle.esm.min.js'
import Storage from './components/Storage'

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

//modal component imports
import Modal from "./components/modal";
import useToggle from "./useToggle";


export default function App() {
  //modal state setup
  const [open, setOpen] = useToggle(false);
  const [lockNftId, setLockNftId] = useState("");



  // state to get mintbase NFTs

  const[mintbase, setMintbase] = useState([])
  
    // state to get paras NFTs

  const[paras, setParas] = useState([])
  const[owned, setOwned] = useState([])
  const[owned1, setOwned1] = useState([])
  const[gifted, setGifted] = useState([])
  
  // state to get storage data
  
  const[stfetchUrl, setUploads] = useState ([])
  
  // state to get storage db
  
  const[straw, setDb] = useState([])

  // state to set LockNftId
  
  const handleSetLockNftId = (id) => {
    setLockNftId(id);
    setOpen();
  };

  
  //set web3.storage API token
  
  const web3Token = process.env.WEB3TOKEN
  const relay = process.env.RELAY

 // add unlockable
 
	const addUnlock = async (lockable) => {
		const res = await fetch(relay, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body:JSON.stringify(lockable)
		})
		
		const data = res.json()
		
		setDb([...straw, data])
		
		//straw.push(lockable)
		const blob = new Blob([JSON.stringify(straw)], {type : 'application/json'})
	
		const files = [
		new File( [blob], 'db.json')
		]
		console.log(straw)
	//	const client = makeStorageClient()
	//	return client.put(files)
	
	}

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract
          .getGreeting({ accountId: window.accountId });

        
        // Check NFTs from Mintbase for Mintbase component

        const getMintbase = async() => {
          const mintbase = await fetchMintbase()
          setMintbase(mintbase)
        }
      
        getMintbase()
		
        // Check NFTs from Paras for Paras component

        const getParas = async() => {
          const paras = await fetchParas()
          setParas(paras)
        }
      
        getParas()
		
		const getOwned = async() => {
			const owned = await fetchOwned()
			setOwned(owned)
		}
		
		getOwned()
		
		const getOwned1 = async() => {
			const owned1 = await fetchOwned1()
			setOwned1(owned1)
		}
		
		getOwned1()
		
		const getGifted = async() => {
			const gifted = await fetchGifted()
			setGifted(gifted)
		}
		
		getGifted()
				
		
		
		// get storage files for unlockables
  
		const listUploads = async () => {
			const client = makeStorageClient()
			const uploadNames = []
			
			for await (const upload of client.list()){
				const uploadObject = {}
				uploadObject.name = upload.name
				uploadObject.id = upload.cid
				uploadNames.push(uploadObject)
			}
			const lastUpdate = uploadNames[0].id
			const stfetchUrl = "https://" + lastUpdate + ".ipfs.dweb.link/root.json"
			setUploads(stfetchUrl)
						
			// web3 storage file/system variable call
	

			const fetchFilecoin = async () => {
		
			const stres = await fetch( stfetchUrl)
			const stdata = await stres.json()
			const stdatastr = JSON.stringify(stdata);
			const straw = JSON.parse(stdatastr);
			return straw
			}
			
			// get db files for unlockables
		
			const getDb = async () => {
				const straw = await fetchFilecoin()
			setDb(straw)
			}
			getDb()
	
		}
		
		const listDbUploads = async () => {
			const fetchUploads = await fetch(relay)
			const data = await fetchUploads.json()
			const stdatastr = JSON.stringify(data)
			const straw = JSON.parse(stdatastr)
			setDb(straw)
			console.log(straw)
			return straw
			

		}
		listDbUploads()
		// listUploads()
		
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );
  

  
  // Mintbase API call

  const fetchMintbase = async () => {

    // define owner using wallet
    const owner = `${window.accountId}`.replace("testnet", "near");
    const res = await fetch("https://mintbase-mainnet.hasura.app/v1/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query:
          '{ thing(where: {tokens: {ownerId: {_eq: "' +
          owner +
          '"}}}) { id, metadata { title, media }}}',
      }),
    }) 
    const data = await res.json()
    const datastr = JSON.stringify(data);
    const raw = JSON.parse(datastr);
    const mintbase = raw.data.thing;
    return mintbase
  }
  
    // Paras API call

  const fetchParas = async () => {

// define owner using wallet
    const owner = `${window.accountId}`.replace("testnet", "near");
	
    const res = await fetch("https://api.thegraph.com/subgraphs/name/jilt/parasubgraph", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query:
          '{ tokenSearch(text: "' +
          owner +
          '") { id, media, title, token_series_id }}',
      }),
    })

    const pdata = await res.json()
    const pdatastr = JSON.stringify(pdata);
    const raw = JSON.parse(pdatastr);
	const paras = raw.data.tokenSearch;
    return paras
  }
  
   const fetchOwned = async () => {
//	   define owner using wallet
	const owner = `${window.accountId}`.replace("testnet", "near");
	const preres = await fetch ("https://api.thegraph.com/subgraphs/name/jilt/parasubgraph", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			query:
			  '{ nftBuys(where: {owner_id: "' + owner + '"}) { token_series_id }}'
		}),
	})
	const owndata = await preres.json();
	const owndatastr = JSON.stringify(owndata);
	const ownraw = JSON.parse(owndatastr);
	const owned = ownraw.data.nftBuys;
	return owned;
   }
   
    const fetchOwned1 = async () => {
//	   define owner using wallet
	const owner = `${window.accountId}`.replace("testnet", "near");
	const preres1 = await fetch ("https://api.thegraph.com/subgraphs/name/jilt/parasubgraph", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			query:
			   '{ nftTransferPayouts(where: {new_owner_id: "' + owner + '"}) { token_series_id }}'
		}),
	})
	const owndata1 = await preres1.json();
	const owndatastr1 = JSON.stringify(owndata1);
	const ownraw1 = JSON.parse(owndatastr1);
	const owned1 = ownraw1.data.nftTransferPayouts;
	return owned1;
   }
   
   const fetchGifted = async () => {
//	   define owner using wallet
	const owner = `${window.accountId}`.replace("testnet", "near");
	const pregres = await fetch ("https://api.thegraph.com/subgraphs/name/jilt/parasubgraph", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			query:
			  '{ nftTransfers(where: {new_owner_id: "' + owner + '"}) { token_series_id }}'
		}),
	})
	const giftdata = await pregres.json();
	const giftdatastr = JSON.stringify(giftdata);
	const giftraw = JSON.parse(giftdatastr);
	const gifted = giftraw.data.nftTransfers;
	return gifted;
   }
  
	
	// Create default storage client
  
	//function makeStorageClient() {
	//	return new Web3Storage({ token: web3Token })
	//}



  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <run />
        <h1>Varda Vault</h1>
        <p>To access unlockable content from your NEAR NFTs login below</p>
        <p>
          For creators looking to lock content to NFTs please read this{" "}
          <a
            href="https://github.com/jilt/varda-vault#readme"
            title="creator guide"
          >
            How To!
          </a>
        </p>
		
        <p>
          This is a free service brought you by the{" "}
          <a href="https://www.varda.vision">Varda Dev Team</a>.
        </p>
        <p style={{ textAlign: "center", marginTop: "2.5em" }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: "right" }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          Hi {window.accountId.replace("testnet", "near")}!
        </h1>
        <form
          style={{
            visibility: "hidden",
          }}
        >
          <input
            className="owner"
            type="textbox"
            defaultValue={() => e.value === owner}
          />
        </form>
        <div className="tab_container">
          <input
            id="tab1"
            type="radio"
            className="vault"
            name="tabs"
            defaultChecked
          />
          <label htmlFor="tab1" className="tabs">
            <i className="fa fa-code"></i>
            <span>Mintbase</span>
          </label>

          <input id="tab2" type="radio" className="vault" name="tabs" />
          <label htmlFor="tab2" className="tabs">
            <i className="fa fa-pencil-square-o"></i>
            <span>Paras</span>
          </label>

          <input id="tab3" type="radio" className="vault" name="tabs" />
          <label htmlFor="tab3" className="tabs">
            <i className="fa fa-bar-chart-o"></i>
            <span>Scarcity Tools</span>
          </label>

          <section id="content1" className="tab-content">
            <div className="target">
				<p className="suggestion">Mintbase NFTs that you own, click on the button to get or save the unlockable content</p>
              <Mintbase mintbase={mintbase} action={handleSetLockNftId}/>
            </div>
          </section>

          <section id="content2" className="tab-content">
            <div className="target1">
				<p className="suggestion">Paras NFTs that you created, click on the button to save the unlockable content</p>
				<Paras paras={paras} action={handleSetLockNftId}/>
				<p className="suggestion">Paras NFTs that you own, click on the button to get the unlockable content</p>
				<Owned owned={owned1} action={handleSetLockNftId}/>
				<Owned owned={owned} action={handleSetLockNftId}/>
				<p className="suggestion">Gifted Paras NFTs, click on the button to get the unlockable content</p>
				<Gifted gifted={gifted} action={handleSetLockNftId}/>
			</div>
          </section>

          <section id="content3" className="tab-content">
            <p className="suggestion">The place where Varda shares her tools to impact the NEAR NFT ecosystem</p>
			<p>
				<button className="tools-btn btn"><a href="#" title="coming soon" alt="coming soon">Stove</a></button>  Burn your unwanted NFTs to stake on the blockchain nodes with <a href="https://metapool.app/" target="_blank" title="staking pool" alt="staking pool">Metapool</a>
			</p>
				<h6 className="right">hodling APY 10%</h6>
				<h6 className="right"><a href="https://www.ref.finance/" target="_blank" title="swap to near" alt="swap to near">swap here</a> to stop earning</h6>
			<p>
				<button className="tools-btn btn"><a href="#" title="coming soon" alt="coming soon">Metaverse</a></button>  See the Varda's DeFi tools for building your P2E metaverse on Near.
			</p>
			<p>
				<button className="tools-btn btn"><a href="#" title="coming soon" alt="coming soon">NFT curated collections</a></button>  Our premium art marketplace
			</p>
          </section>
        </div>

        <hr />
        <p
          style={{
            textAlign: "center",
          }}
        >
          Free service brought you by the{" "}
          <a href="https://www.varda.vision">Varda Dev Team</a>.
        </p>
      </main>

      <div className="modal-container">
	  

        {open && (
          <Modal open={open} toggle={setOpen} locknftId={lockNftId} >
		  		<Storage straw={straw} locknftId={lockNftId} onAdd={addUnlock}/>
          </Modal>
        )}
      </div>
    </>
  );
}

