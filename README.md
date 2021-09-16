Varda Vault secret NFT content locker
==================================


This repo is built to connect all NEAR NFTs to unlockable content.
The contract is quite simple. It can store the account_id of last sender and return all the owned NFTs along with unlockable contente related to them.
The interface allows to lock new content to the owned NFTs.

## Lock secret content

We suggest to upload the unlockable content to IPFS using [pinata service](https://pinata.cloud/pinmanager)
Once the content is uploaded copy the CID file number from pinata, login to the [Varda Vault](https://www.varda.vision/vault/index.html) and select the "lock" button in line with the NFT you created and own in your wallet. You can link both IPFS CID and normal links to your NFTs, in order to be able to let people access to web apps using the Varda interface, an API for Exclusive access to your custom URL is in development.

Editing link once saved is possible but you'll need to pay a 1 near fee, please contact jilt (at) jeeltcraft (dot) com if needed.


### Unlock secret content

Secret content is available only to the NFT token owner.
Access the [Varda Vault](https://www.varda.vision/vault/index-wip.html) and click the button "unlock" corresponding to the NFT you own.

### Kindly brought you by the Varda Team
