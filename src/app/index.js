const Blockchain = require('../utilities/blockchain');
const Block = require('../utilities/block');

async function run() {
  const blockchain = new Blockchain();
  const block1 = new Block({ nro_tramite: '345' });
  const block2 = new Block({ data: 'Block 2' });
  const block3 = new Block({ data: 'Block 3' });
  const block4 = new Block({ data: 'Block 4' });

  await blockchain.addBlock(block1);
  await blockchain.addBlock(block2);
  await blockchain.addBlock(block3);
  await blockchain.addBlock(block4);

  const datablock = blockchain.returnData();
  console.log(
    'Los datos de los bloques son ',
    JSON.parse(datablock[1]).nro_tramite
  );
}

run();
