const getarticleContent = () => {
    const slug = document.getElementById("getBlogContent").getAttribute("slug");

    fetch('/getBlogContent/' + slug)
        .then(response => {
            return response.json()
        })
        .then(response => {
            const articleTitle = document.createElement("h2")
            articleTitle.className = "article-title"
            articleTitle.innerText = response[0].attributes.Title

            const articleDesc = document.createElement("p")
            articleDesc.className = "article-desc"
            articleDesc.innerText = response[0].attributes.Description

            const articleContent = document.createElement("p")
            articleContent.className = "article-content"
            articleContent.innerText = response[0].attributes.Content

            document.getElementById("article").appendChild(articleTitle)
            document.getElementById("article").appendChild(articleDesc)
            document.getElementById("article").appendChild(articleContent)
        })
        .then(response => {

        })
}

getarticleContent()