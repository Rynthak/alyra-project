<template>
  <b-container>
    <h1 class="title">Add new Ads</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="adsTitleGroup"
        label="Ads Title:"
        label-for="adsTitle"
        description="Please enter the ADS title"
      >
        <b-form-input
          id="adsTitle"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter Ads Title"
        />
      </b-form-group>

      <b-form-group
        id="adsDescriptionGroup"
        label="Ads Description:"
        label-for="adsDescription"
        description="Please enter the ADS description"
      >
        <b-form-textarea
          id="adsDescription"
          v-model="form.description"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          required
        />

        <pre class="mt-3 mb-0">{{ form.description }}</pre>
      </b-form-group>
      <b-form-group
        id="adsPicturesGroup"
        label="Ads Pictures:"
        label-for="adsPictures"
        description="Please upload ADS pictures"
      >
        <b-form-file
          id="adsPictures"
          v-model="form.pictures"
          :state="Boolean(form.pictures)"
          placeholder="Choose pictures picture..."
          drop-placeholder="Drop file here..."
          :multiple="Boolean(true)"
          accept="image/*"
        />
      </b-form-group>

      <button class="btn btn-primary">Add new ADS</button>
    </b-form>
  </b-container>
</template>
<script>

import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'


export default {
  data() {
    return {
      ipfsDBREADY: false,
      ipfs: null,
      orbitdb: null, 
      docstore: null, 
      form: {
        title: "",
        description: "",
        pictures: null
      },
      show: true
    };
  },
  mounted() {
    console.log("dispatching getContractInstance");
    this.$store.dispatch("getContractInstance");
 
    this.ipfs = new IPFS({
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
          Addresses: {
            Swarm: [
              // Use IPFS dev signal server
              // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
              '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
              // Use local signal server
              // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
              "/ip4/107.170.133.32/tcp/4001/ipfs/QmUZRGLhcKXF1JyuaHgKm23LvqcoMYwtb9jmh8CkP4og3K",
              "/ip4/139.59.174.197/tcp/4001/ipfs/QmZfTbnpvPwxCjpCG3CXJ7pfexgkBZ2kgChAiRJrTK1HsM",
              "/ip4/139.59.6.222/tcp/4001/ipfs/QmRDcEDK9gSViAevCHiE6ghkaBCU7rTuQj4BDpmCzRvRYg",
              "/ip4/46.101.198.170/tcp/4001/ipfs/QmePWxsFT9wY3QuukgVDB7XZpqdKhrqJTHTXU7ECLDWJqX",
              "/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s",
              "/ip4/198.46.197.197/tcp/4002/ipfs/QmWAm7ZPLGTgofLXZgoAzEaNkYFPsaVKKGjWscE4Fbec9P"
            ]
          },
          //Bootstrap: [
          //  "/ip4/198.46.197.197/tcp/4001/ipfs/QmdXiwDtfKsfnZ6RwEcovoWsdpyEybmmRpVDXmpm5cpk2s",
          //  "/ip4/198.46.197.197/tcp/4002/ipfs/QmWAm7ZPLGTgofLXZgoAzEaNkYFPsaVKKGjWscE4Fbec9P"
          //]
        }
    })
    this.ipfs.on('ready', async () => {
     this.orbitdb = new OrbitDB(this.ipfs)
      
     const docstore = await this.orbitdb.docstore('dapp-sells', { indexBy: 'doc' });
        
      this.ipfsDBREADY = true;    
 console.log(docstore);
    //await this.db.put('hello', { name: 'World' });

   docstore.put({ _id: 'hello world', doc: 'some things' })
  .then(() => docstore.put({ _id: 'hello universe', doc: 'all the things' }))
  .then(() => docstore.get('all'))
  .then((value) => console.log(value))

    }) 

  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(JSON.stringify(this.form));

      this.$store.state.contractInstance().owner((err, result) => {
        if (err) {
          console.log(err);
          //this.pending = false;
        } else {
            console.log(result);
        }
      });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = "";
      this.form.description = "";
      this.form.pictures = null;

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>