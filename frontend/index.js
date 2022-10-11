import 'regenerator-runtime/runtime';
import { Wallet } from './near-wallet';
import { HelloNEAR } from './near-interface';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });
const relay = process.env.RELAY;

// Setup on page load
window.onload = async () => {
  let isSignedIn = await wallet.startUp();

  if (isSignedIn) {
    signedInFlow();
  } else {
    signedOutFlow();
  }
  
  fetchOwned();
};

// Button clicks
document.querySelector('#sign-in-button').onclick = () => { wallet.signIn(); };
document.querySelector('#sign-out-button').onclick = () => { wallet.signOut(); };


// Get greeting from the contract on chain
async function fetchGreeting() {
  const currentGreeting = await helloNEAR.getGreeting();

  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    el.innerText = currentGreeting;
    el.value = currentGreeting;
  });
}

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-in-flow').style.display = 'none';
  document.querySelector('#signed-out-flow').style.display = 'block';
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-out-flow').style.display = 'none';
  document.querySelector('#signed-in-flow').style.display = 'block';
  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = wallet.accountId;
  });
}
   

 async function fetchOwned() {
	 
	// define owner using wallet

  const owner = wallet.accountId;
  const owner1 = "jilt.near";
  // const relay = process.env.RELAY;
  const relay = "https://Varda-vault-relay-server.jilt1.repl.co/locked";
	// getting nfts
	const preres = await fetch ("https://interop-mainnet.hasura.app/v1/graphql", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			query:
			  '{ nft_tokens(where: {owner: {_eq: "' + owner + '"}}) { metadata_id, token_id }}'
		}),
	})
	const owndata = await preres.json();
	const owndatastr = JSON.stringify(owndata);
	const ownraw = JSON.parse(owndatastr);
	const owned = ownraw.data.nft_tokens;
	parseOwned(owned).then(tokenraw => {
		const tokenstr = JSON.stringify(tokenraw);
		const tokenJson = JSON.parse(tokenstr);
		console.log(owned);
		var lockAble = document.getElementById("locker");
		const locked = tokenJson.map ( toked => {
			var nft = toked.data.nft_metadata;
			var index = tokenJson.indexOf(toked);
			var contract = nft[0].nft_contract_id;
			var base = nft[0].nft_contracts.base_uri;
			var misfits = "https://ipfs.io/ipfs/bafybeiabjp7akpupfhnr53bmwp5gyesorlqzn4a3qk4g5hdami3epfw2me/";
			if (nft[0].nft_contract_id == "x.paras.near"){
				lockAble.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-start"><img src="https://cloudflare-ipfs.com/ipfs/' + nft[0].media + '" class="list-image" /><div class="ms-2 me-auto"><div class="fw-bold">' + nft[0].title + '</div></div><span class="badge bg-info rounded-pill"><a type="button" data-bs-toggle="modal" id="'+ owned[index].token_id +'" onclick="unLockAble(this)" data-bs-target="#exampleModal" title="' + nft[0].title + '">unlock</a></span></li>';
			}else{
				 if(contract.endsWith('mintbase1.near') || contract.endsWith('mrbrownproject.near')){
					 lockAble.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-start"><img src="' + nft[0].media + '" class="list-image" /><div class="ms-2 me-auto"><div class="fw-bold">' + nft[0].title + '</div></div><span class="badge bg-info rounded-pill"><a type="button" data-bs-toggle="modal" id="'+ owned[index].metadata_id +'" onclick="unLockAble(this)" data-bs-target="#exampleModal" title="' + nft[0].title + '">unlock</a></span></li>';
				 }else{
					 if (base != null){
						 lockAble.innerHTML += '<li id="'+ owned[index].metadata_id  +'" class="list-group-item d-flex justify-content-between align-items-start"><img src="' + base + '/' + nft[0].media + '" class="list-image" /><div class="ms-2 me-auto"><div class="fw-bold">' + nft[0].title + '</div></div><span class="badge bg-info rounded-pill"><a type="button" data-bs-toggle="modal" id="'+ owned[index].metadata_id +'" onclick="unLockAble(this)" data-bs-target="#exampleModal" title="' + nft[0].title + '">unlock</a></span></li>';
					 }else{
						 lockAble.innerHTML += '<li id="'+ owned[index].metadata_id  +'" class="list-group-item d-flex justify-content-between align-items-start"><img src="' + nft[0].media + '" class="list-image" /><div class="ms-2 me-auto"><div class="fw-bold">' + nft[0].title + '</div></div><span class="badge bg-info rounded-pill"><a type="button" data-bs-toggle="modal" id="'+ owned[index].metadata_id +'" onclick="unLockAble(this)" data-bs-target="#exampleModal" title="' + nft[0].title + '">unlock</a></span></li>';
					 }
				 };
				
			}
		
			});
		
	});
   }
   
   async function parseOwned(owned) {
	   const tokenraw = Promise.all(
			owned.map(async (lock) => await (await fetch("https://interop-mainnet.hasura.app/v1/graphql", {
			method: "POST",
			headers:{ "content-type": "application/json" },
			body: JSON.stringify({
				query:
				'{ nft_metadata(where: {id: {_eq: "' + lock.metadata_id + '" }}) { media, title, nft_contract_id, nft_contracts {base_uri} }}'
				}),
			})).json())
			)
		return tokenraw;
   }


