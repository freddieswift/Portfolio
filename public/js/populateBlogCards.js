const getArticles = () => {
    const params = new URLSearchParams({
        fields: ['title', 'slug', 'description'],
        populate: "tags"
    })

    const pathname = window.location.pathname;
    if (pathname !== '/blogs') {
        params.append('_limit', '3')
    }

    fetch('http://localhost:1337/api/articles?' + params)
        .then(response => {
            return response.json()
        })
        .then(response => {
            createBlogCard(response.data)
        })
}

const createTags = (tags) => {
    let tagElementsArray = tags.data.map(tag => {
        const tagElement = document.createElement("div")
        tagElement.className = "blog-card-tag"
        tagElement.innerText = tag.attributes.name
        return tagElement
    })
    return tagElementsArray
}

const createBlogCard = (articles) => {
    articles.forEach(article => {
        const blogCard = document.createElement("div")
        blogCard.className = "blog-card"
        blogCard.id = article.attributes.Slug

        blogCard.addEventListener('click', () => {
            location.href = "/blogs/" + blogCard.id
        })

        const blogCardImg = document.createElement("img")
        blogCardImg.className = "blog-card-img"
        blogCardImg.src = "img/fast.jpg"

        const blogCardInfo = document.createElement("div")
        blogCardInfo.className = "blog-card-info"

        const blogCardTitle = document.createElement("h3")
        blogCardTitle.className = "blog-card-title"
        blogCardTitle.innerText = article.attributes.Title

        const blogCardDesc = document.createElement("p")
        blogCardDesc.className = "blog-card-desc"
        blogCardDesc.innerText = article.attributes.Description

        const tagElementsArray = createTags(article.attributes.tags)

        tagElementsArray.forEach(tagElement => {
            blogCardInfo.append(tagElement)
        })

        blogCardInfo.append(blogCardTitle)
        blogCardInfo.append(blogCardDesc)

        blogCard.append(blogCardImg)
        blogCard.append(blogCardInfo)

        document.getElementById("blog-grid").appendChild(blogCard)
    })
}



getArticles()