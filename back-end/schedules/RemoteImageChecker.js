const schedule = require('node-schedule');
const ElasticSearchManager = require('../managers/ElasticSearchManager.js');

const elasticSearchManager = new ElasticSearchManager()

const remoteImageChecker = async () => {
    console.log('remote checkers')
    schedule.scheduleJob('*/1 * * * *', function() {
        console.log('schedule job called');
    })
}

module.exports = remoteImageChecker;

