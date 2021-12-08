import "regenerator-runtime/runtime";
import React, { useState } from "react";
import { login, logout } from "./utils";
import Mintbase from './components/Mintbase'
import "./global.css";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

//modal component imports
import Modal from "./components/modal";
import useToggle from "./useToggle";

export default function App() {
  //modal state setup
  const [open, setOpen] = useToggle(false);
  const [lockNftId, setLockNftId] = useState("");

  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState();

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false);

  // function to get mintbase NFTs

  const[mintbase, setMintbase] = useState([])

  // function to setLockNftId
  const handleSetLockNftId = (id) => {
    setLockNftId(id);
    setOpen();
  };

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract
          .getGreeting({ accountId: window.accountId })
          .then((greetingFromContract) => {
            setGreeting(greetingFromContract);
          });

        
        // Check NFTs from Mintbase for Mintbase component

        const getMintbase = async(id) => {
          const mintbase = await fetchMintbase()
          setMintbase(mintbase)
        }
      
        getMintbase()
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
          '"}, _and: {list: {_not: {removedAt: {_is_null: false}}}}}}) { id, metadata { title, media }}}',
      }),
    }) 
    const data = await res.json()
    const datastr = JSON.stringify(data);
    const raw = JSON.parse(datastr);
    const mintbase = raw.data.thing;
    return mintbase
  }


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
          <label
            htmlFor="greeting"
            style={{
              color: "var(--secondary)",
              borderBottom: "2px solid var(--secondary)",
            }}
          >
            {greeting}
          </label>
          {
            " " /* React trims whitespace around tags; insert literal space character when needed */
          }
          {window.accountId}!
        </h1>
        <p>
          These are your NFTs, click on the botton to get the unlockable content
          for each of them!
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            // get elements from the form using their id attribute
            const { fieldset, greeting } = event.target.elements;

            // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
            const newGreeting = greeting.value;

            // disable the form while the value gets updated on-chain
            fieldset.disabled = true;

            try {
              // make an update call to the smart contract
              await window.contract.setGreeting({
                // pass the value that the user entered in the greeting field
                message: newGreeting,
              });
            } catch (e) {
              alert(
                "Something went wrong! " +
                  "Maybe you need to sign out and back in? " +
                  "Check your browser console for more info."
              );
              throw e;
            } finally {
              // re-enable the form, whether the call succeeded or failed
              fieldset.disabled = false;
            }

            // update local `greeting` variable to match persisted value
            setGreeting(newGreeting);

            // show Notification
            setShowNotification(true);

            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false);
            }, 11000);
          }}
        >
          <fieldset id="fieldset">
            <label
              htmlFor="greeting"
              style={{
                display: "block",
                color: "var(--gray)",
                marginBottom: "0.5em",
              }}
            >
              Change greeting
            </label>
            <div style={{ display: "flex" }}>
              <input
                autoComplete="off"
                defaultValue={greeting}
                id="greeting"
                onChange={(e) => setButtonDisabled(e.target.value === greeting)}
                style={{ flex: 1 }}
              />
              <button
                disabled={buttonDisabled}
                style={{ borderRadius: "0 5px 5px 0" }}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>

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
            <span>Pluminite</span>
          </label>

          <section id="content1" className="tab-content">
            <div className="target">
              <Mintbase mintbase={mintbase} action={() => handleSetLockNftId()}/>
            </div>
          </section>

          <section id="content2" className="tab-content">
            <div className="target1"><p>Under Construction</p></div>
          </section>

          <section id="content3" className="tab-content">
            <p>Under Construction</p>
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
      {showNotification && <Notification />}

      <div className="modal-container">
        {/* <button type="button" onClick={() => setOpen()}>
          Open Modal
        </button> */}

        {open && (
          <Modal open={open} toggle={setOpen} locknftId={lockNftId}>
            <h1>{lockNftId}</h1>
          </Modal>
        )}
      </div>
    </>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'setGreeting' in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
