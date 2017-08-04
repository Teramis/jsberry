/**
 * JsBerry
 * process balancer
 */

const os = require('os');
const cluster = require('cluster');

const numCPUs = os.cpus().length;
const empMemory = Math.round(100 * os.freemem() / os.totalmem());

module.exports = (start = () => {}) => {

  if (cluster.isMaster) {

    for (let i = 0; i < numCPUs; i++) {

      cluster.fork();

    }

    cluster.on('exit', () => {

      cluster.fork();

    });

  } else {

    start(empMemory);

  }

};
