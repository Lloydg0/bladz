import axios from "./axios";
import { useState, useEffect } from "react";

export default function News() {
    const [news, setNews] = useState([]);
    console.log("news items", news);
    useEffect(() => {
        console.log("useEffect for news just ran");
        (async () => {
            const { data } = await axios.get("/news").catch(console.log);
            setNews(data);
        })();
    }, []);
    return (
        <>
            <h1>Market News</h1>
            {news &&
                news.slice(0, 10).map(({ href, text, source, time, name }) => {
                    let date = new Date(time);
                    let formattedDate = new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "long",
                        timeStyle: "short",
                    }).format(date);
                    return (
                        <div className="" key={time}>
                            <img className="" src={href}></img>
                            <span className="">{name}</span>
                            <span className="">{text}</span>
                            <span className="">{source}</span>
                            <span className="">{formattedDate}</span>
                        </div>
                    );
                })}
        </>
    );
}
