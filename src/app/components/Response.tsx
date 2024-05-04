"use client"
import React, { useState, useEffect, } from 'react'
import keys from '../../../keys.json'


export default function Response({ value }: any) {

    const [response, setResponse] = useState({ message: { content: '' } });
    const [url, setUrl] = useState('');
    const [responseArray, setResponseArray] = useState<string[]>([]);

    //to check if there exists a wikipedia article with the title provided. only display the iframe if there is 
    const [articleFound, setArticleFound] = useState(false);


    const OpenAI = require('openai');
    const OPENAI_API_KEY = keys.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    const baseWikipediaUrl = "https://en.wikipedia.org/wiki/";
    const wikipediaAccessToken = keys.WIKIPEDIA_API_KEY;


    const [resultBoxDisplay, setResultBoxDisplay] = useState("h-0");

    const systemType = "You are a Wiki assistant, helping people find what Wikipedia article they're looking for based on a rough description. First provide the name of the article. If the user's query is a question, the article title should be the answer. No asterisks. No single or double quotes. Letters and numbers only. then write a line break, then write a short paragraph under summarising the article. If there isn't a wikipedia article with the name of the provided article, choose the next closest thing.";
    useEffect(() => {
        if (value != '') {
            console.log(value);
            getResponse(value);
        }
    }, [value]);

    useEffect(() => {
        let content = response.message.content;
        const arr: string[] = content.split("\n");
        if (arr[0])
            setResponseArray(arr);
        setUrl(arr[0].split(' ').join('_'));
    }, [response])

    useEffect(()=>{
        searchWikipedia(url);
    },[url])


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
        response.json()
            .then(json=>{
                if(json.pages){
                    if(json.pages.length==0){
                        console.log("article not found");
                        setArticleFound(false);
                        setResultBoxDisplay("h-0");
                    }else{
                        setArticleFound(true);
                        setResultBoxDisplay("h-screen border-2");
                    }
                }
            })
            .catch(error=>{
                console.log("article not found");
                setArticleFound(false);
            });
    }

    return (
        <div className="response flex flex-col space-x-2.5 p-2">
            {response.message.content ? (
                <span className="p-2 m-2 border-2 rounded">
                    <a className="text-4xl text-orange-400 hover:text-orange-300" href={baseWikipediaUrl + url}>
                        {responseArray[0]}
                    </a>
                </span>
            ) : (<></>)
            }


            <span className={"p-2 m-2 rounded " + resultBoxDisplay}>
                {articleFound ?
                    (
                        <iframe src={baseWikipediaUrl + url} title="Wikipedia">
                        </iframe>
                    )
                    :
                    (
                        <></>
                    )
                }

            </span>
        </div>
    )
}
