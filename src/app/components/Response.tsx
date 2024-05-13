/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState, useEffect, } from 'react'
//function to clean up any double quotes or full stops in the generated response
function responseCleanUp(response:string){
    let cleanedUpString = response.replace(/^"(.*)"$/, '$1').replace(/\.$/, '');
    return cleanedUpString;
}


export default function Response({ value }: any) {

    const [response, setResponse] = useState({ message: { content: '' } });
    const [url, setUrl] = useState('');

    //responseReady is to prevent the article title and iframe from showing for a split second before the article not found error is shown
    const [responseReady, setResponseReady] = useState(false);
    const [responseArray, setResponseArray] = useState<string[]>([]);

    //to check if there exists a wikipedia article with the title provided. only display the iframe if there is 
    const [articleFound, setArticleFound] = useState(false);


    const OpenAI = require('openai');
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    const baseWikipediaUrl = "https://en.wikipedia.org/wiki/";
    const wikipediaAccessToken = process.env.NEXT_PUBLIC_WIKIPEDIA_KEY;


    const [resultBoxDisplay, setResultBoxDisplay] = useState("h-0");
    const [titleBoxDisplay, setTitleBoxDisplay] = useState("border-2 p-2 m-1");

    const systemType = "You are a Wiki assistant, helping people find what Wikipedia article they're looking for based on a rough description. First provide the name of the article. If the user's query is a question, the article title should be the answer. No asterisks. No single or double quotes. Letters and numbers only. then write a line break, then write a short paragraph under summarising the article. If there isn't a wikipedia article with the name of the provided article, choose the next closest thing.";
    

    
    useEffect(() => {
        console.log(process.env);
        if (value != '') {
            console.log(value);
            getResponse(value);
        }
    }, [value]);

    //TODO make this come after the searchWikipedia API call 

    useEffect(() => {
        console.log("response changed");
        setResponseReady(false);
        let content = response.message.content;
        const arr: string[] = content.split("\n");
        if (arr[0])
            console.log(arr[0])
            //clean-up
            arr[0] = responseCleanUp(arr[0]);
            console.log(arr[0]);
            setResponseArray(arr);
        setUrl(arr[0].split(' ').join('_'));


    }, [response])

    useEffect(() => {
        console.log("url changed")
        searchWikipedia(url);
    }, [url])


    async function getResponse(query: any) {
        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": systemType },
            { "role": "user", "content": query },],
            model: "gpt-3.5-turbo",
        });
        setResponse(completion.choices[0]);
    }

    async function searchWikipedia(query: string) {
        console.log("query string: " + query);
        let url = 'https://api.wikimedia.org/core/v1/wikipedia/en/search/title?q=' + query + "&limit=10";
        let response = await fetch(url,
            {
                headers: {
                    'Authorization': `Bearer ${wikipediaAccessToken}`,
                    'Api-User-Agent': 'wikiWhat'
                }
            }
        );
        await response.json()
            .then(json => {
                console.log(json);
                setResponseReady(true);
                if (json.pages) {
                    if (json.pages.length == 0) {
                        console.log("article not found");
                        setResultBoxDisplay("h-0");
                        setTitleBoxDisplay(" ");
                        setArticleFound(false);
                    } else {
                        setArticleFound(true);
                        setResultBoxDisplay("h-screen border-2");
                        setTitleBoxDisplay("border-2 p-2 m-1");
                    }
                }
            })
            .catch(error => {
                setResponseReady(true);
                console.log("article not found");
                setArticleFound(false);
                setResultBoxDisplay("h-0");
                setTitleBoxDisplay(" ");
            });
    }

    return (
        <div className="response flex flex-col items-center  p-2">
            {responseReady ? (
                <span className={"rounded w-full " + titleBoxDisplay}>
                    <a className="text-4xl text-orange-400 hover:text-orange-300" href={baseWikipediaUrl + url}>
                        {articleFound? (responseArray[0]) : (<></>)}
                    </a>
                </span>
            ) : (<></>)
            }


            <span className={"p-2 m-1 rounded w-full " + resultBoxDisplay}>
                {articleFound ?
                    (
                        <iframe src={baseWikipediaUrl + url} title="Wikipedia">
                        </iframe>
                    )
                    :
                    (
                        <div className="not-found">
                            {/* only output error message if the response is ready) */}
                            {responseReady? (<h3>Sorry, I couldn't find a match to your query.</h3>) : (<></>)}
                        </div>
                    )
                }

            </span>
        </div>
    )
}
