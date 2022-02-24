varda-vault secret content locker for NEAR nft
==================


This repo is built to connect all NEAR NFTs to unlockable content. The contract is quite simple. It returns all the owned NFTs along with unlockable content related to them. The interface allows to lock new content to the owned NFTs.

**Lock secret content** <br />
We suggest to upload the unlockable content to IPFS using web3.storage (1T free immutable upload) Once the content is uploaded copy the CID file number from your files page, login to the Varda Vault and select the "lock" button in line with the NFT you created/own in your wallet. You can link both IPFS CID and normal links to your NFTs, in order to be able to let people access to web apps using the Varda interface, an API for Exclusive access to your custom URL will be soon available.
A discord Bot for locking immutable content to your NFTs directly from the Varda server will be built soon.
Please remember the locked content is immutable, so you can't change it after locking.

**Unlock secret content** <br />
Secret content is available only to the NFT token owner. Access the Varda Vault and click the button "unlock" corresponding to the NFT you own.

Kindly brought you by the Varda Team
