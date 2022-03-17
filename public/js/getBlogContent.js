const getArticle = (callback) => {
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

    fetch('/getData/', {
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

const renderArticle = () => {
    getArticle((article) => {
        const articleTitle = document.createElement("h2")
        articleTitle.className = "article-title"
        articleTitle.innerText = article.attributes.Title

        const articleDesc = document.createElement("p")
        articleDesc.className = "article-desc"
        articleDesc.innerText = article.attributes.Description

        const articleContent = createContentElements(marked.parse(article.attributes.Content))

        document.getElementById("article").appendChild(articleTitle)
        document.getElementById("article").appendChild(articleDesc)
        document.getElementById("article").appendChild(articleContent)
    })
}


//creates html elements for article content
//convert gists from script tages to elements by extracting the gistLinks
//and getting json data from github
//json data contains div element that can be used inplace of the script elements
//returns a div representing article content
const createContentElements = (htmlString) => {
    //parse the html string and get HTML document
    const blogContentDocument = parseHTMLString(htmlString)
    const blogContentDiv = document.createElement("div")
    blogContentDiv.className = "article-content"
    //check if there are any scripts in the collection

    //if there are, get child elements of body
    let blogContentElements = Array.from(blogContentDocument.body.children)
    //loop through elements

    for (let i = 0; i < blogContentElements.length; i++) {
        //if element is a script (gist)
        if (blogContentElements[i].nodeName === "SCRIPT") {
            //get url of gist
            gistURL = blogContentElements[i].src
            getGistDiv(gistURL, gistDivString => {
                const gistDocument = parseHTMLString(gistDivString)
                const gistDiv = gistDocument.body.children.item(0)
                blogContentDiv.append(gistDiv)
            })
        }
        else {
            blogContentDiv.append(blogContentElements[i])
        }
    }

    console.log("🚀 ~ file: getBlogContent.js ~ line 60 ~ createContentElements ~ blogContentDiv", blogContentDiv)
    return blogContentDiv
}

//takes a url of a gist and make a request to get the json data
//then gets the div form the json data and converts it into an element
const getGistDiv = (gistURL, callback) => {
    //append 'on' to url to get .json, url originally ends in .js - very handy
    gistURL += 'on'

    fetch('/getGist', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ gistURL })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            callback(response.div)
        })
}

//takes a html string and parses it and returns the children of the body in HTMLCollection
//This gets the blog content from the markdown and parses it into elements
const parseHTMLString = (htmlString) => {
    const document = new DOMParser().parseFromString(htmlString, 'text/html')
    return document
}

renderArticle()