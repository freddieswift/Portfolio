const qs = require('qs');
const axios = require('axios');

const getContentHelper = (params, url, callback) => {
    const query = qs.stringify(params)
    axios.get(url + query)
        .then(response => {
            callback(response.data.data)
        })
}


module.exports = getContentHelper

