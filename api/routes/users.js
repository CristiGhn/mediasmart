var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
const baseUrl = "http://work.mediasmart.io";
const NodeCache = require( "node-cache" );
const cache = new NodeCache();
const ttl = 60 * 60 * 1; // cache for 1 Hour

router.get("/:page", function(req, res, next) {

    let page = req.params.page
    console.log(`Backend page ${page}`)
    
    // Make cache unique based on page
    let cacheId = `cache${page}`
    let cachedString = cache.get(cacheId)
    if (cachedString) {
        
        console.log("value that has been cached")

        validate(cachedString)
        let json = JSON.parse(cachedString)
        res.send(json)
        
    } else {

        let url = `${baseUrl}?page=${page}&page_size=20`
        console.log(`Cache id not found. Make request for url = ${url}`)
        
        fetch(url, {
            method: 'get',
            headers: { 'authorization': 'mediasmart2019' },
        })
        .then(res => res.json())
        .then(json => { 
            validate(json)
            let stringified = JSON.stringify(json)
            cache.set(cacheId, stringified, ttl)
            res.send(stringified)
        });
    }
});

function validate(values) {
    for (value of values) {
        
        if (!isValidUrl(value.image)) {
            value.image = "https://cdn2.iconfinder.com/data/icons/business-process-1/512/client-512.png";
        }

        if ((typeof value.name) != "string") {
            value.name = "This member likes to be mysterious";
        }

        if ((typeof value.bio) != "string") {
            value.bio = "This member does not want to give any details.";
        }

        if (Number.isInteger(value.age)) {
            value.age = value.age + " years old"
        } else {
            value.age = "Forever young";
        }
    }
}

function isValidUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

module.exports = router;
