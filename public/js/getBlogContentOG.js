const getArticleContent = (callback) => {
    const slug = document.getElementById("getBlogContent").getAttribute("slug");

    const params = {
        fields: ['title', 'description', 'content'],
        populate: "tags",
        filters: {
            slug: {
                $eq: slug
            }
        }
    }

    fetch('/getContent/', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(params)
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            callback(response[0])
        })
}

const renderArticleContent = () => {
    getArticleContent((article) => {
        const articleTitle = document.createElement("h2")
        articleTitle.className = "article-title"
        articleTitle.innerText = article.attributes.Title

        const articleDesc = document.createElement("p")
        articleDesc.className = "article-desc"
        articleDesc.innerText = article.attributes.Description

        const articleContent = document.createElement("div")
        articleContent.className = "article-content"
        articleContent.innerHTML = marked.parse(article.attributes.Content);

        parseHTMLString(marked.parse(article.attributes.Content))

        document.getElementById("article").appendChild(articleTitle)
        document.getElementById("article").appendChild(articleDesc)
        document.getElementById("article").appendChild(articleContent)
    })
}

//appends all elemnts in HTML collection to article
//when an element is appended, it is removed from the collection
const renderArticle = (collection) => {
    const article = document.getElementById("article")
    while (collection.length > 0) {
        article.appendChild(collection[0])
    }
}

//1 - takes the html string returned from parsing the article markdown file
//2 - parses the html string into a html docuemnt
//3 - gets the script elements from the html document
//4 - if there are scripts present: extracts the url for the gist(s) from the script element(s)
// getGistLinks = (articleContentString) => {
//     const articleContentDOMDocument = parseHTMLString(articleContentString)
//     if (articleContentDOMDocument.scripts) {
//         const gistScripts = articleContentDOMDocument.scripts
//         let gistLinks = []
//         for (let articleGist of )
//     }

// }

//takes a html string and parses it and returns the children of the body in HTMLCollection
//This gets the blog content from the markdown and parses it into elements
const parseHTMLString = (htmlString) => {
    const document = new DOMParser().parseFromString(htmlString, 'text/html')
    return document.body.children
}

renderArticleContent()