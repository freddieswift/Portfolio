const qs = require('qs');
const axios = require('axios');

const getBlogContent = (slug, callback) => {
    const query = qs.stringify({
        fields: ['title', 'description', 'content'],
        populate: "tags",
        filters: {
            slug: {
                $eq: slug
            }
        }
    })

    axios.get('http://localhost:1337/api/articles?' + query)
        .then(response => {
            callback(response.data.data)
        })
}






module.exports = getBlogContent

