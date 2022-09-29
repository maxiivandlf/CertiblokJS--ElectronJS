const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.height === -1) {
      const block = new Block({ data: 'Genesis Block' });
      await this.addBlock(block);
    }
  }

  addBlock(block) {
    let self = this;
    return new Promise(async (resolve, reject) => {
      block.height = self.chain.length;
      block.time = new Date().getTime().toString();

      if (self.chain.length > 0) {
        block.previousBlockHash = self.chain[self.chain.length - 1].hash;
      }

      let errors = await self.validateChain();

      if (errors.length > 0) {
        reject(new Error('La cadena no es valida'));
      }

      block.hash = SHA256(JSON.stringify(block)).toString();

      self.chain.push(block);
      resolve(block);
    });
  }

  validateChain() {
    let self = this;
    const errors = [];
    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block) => {
        try {
          let isValid = await block.validate();
          if (!isValid) {
            errors.push(new Error(`El Bloque ${block.height} no es valido`));
          }
        } catch (err) {
          errors.push(err);
        }
      });
      resolve(errors);
    });
  }

  returnData() {
    let self = this;

    let bloks = [];

    //console.log(self.chain);
    // let body = [];
    self.chain.forEach((element) => {
      let bodybloc = {
        body: element.body.toString(),
        hash: element.hash,
      };
      bloks.push(bodybloc);
    });
    return bloks;
  }
}

module.exports = Blockchain;
