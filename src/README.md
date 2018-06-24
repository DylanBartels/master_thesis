# openlogistics

Decentralized p2p logistics

#### Setup Credentials

Credentials for bigchainDB are neccecarry, these can be obtained [here](https://testnet.bigchaindb.com/signup).

``` bash
touch .env
nano .env
```

Fill in the APP_ID and APP_KEY with the created bigchaindb credentials.

``` bash
APP_URL=https://test.bigchaindb.com/api/v1/
APP_ID=
APP_KEY=
BCDB_META_TAG=OpenLogisticsBeta
```

On first run three keypairs will be generated in: ~/Library/Application Support/OpenLogistics
Every keypair represents a actor in the test setup mechanism.

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

#### Walkthrough

// todo
