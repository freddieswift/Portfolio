const axios = require('axios');

const getGist = (url, callback) => {
    axios.get(url)
        .then(response => {
            callback(response.data.div)
        })
}

module.exports = getGist