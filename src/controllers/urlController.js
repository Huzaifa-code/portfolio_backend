const shortid = require("shortid");
const URL = require("../models/url");

const baseUrl = 'https://www.developerhuzaifa.site/';


async function handleGenerateNewShortUrl(req, res){

    const body = req.body;
    if(!body.url)   return res.status(400).json({error: "URL is required"});

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return  res.json({shortUrl: `${baseUrl}url/${shortID}`})
}

async function handleRedirectShortUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },{
        $push : {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    }
    );

    res.redirect(entry.redirectURL);
}


async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json(
        {   
            totalClicks: result.visitHistory.length, 
            analytics: result.visitHistory,   
        }
    );
}


module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectShortUrl,
    handleGetAnalytics
}