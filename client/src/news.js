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
            <h1 className="news-header">Market News</h1>
            <div className="news-container">
                {news &&
                    news.slice(0, 20).map(({ href, text, time, name }) => {
                        const newText = text.slice(0, -23);
                        let date = new Date(time);
                        let formattedDate = new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "long",
                            timeStyle: "short",
                        }).format(date);
                        return (
                            <div className="news-box" key={time}>
                                <img className="news-img" src={href}></img>
                                <div className="news-description">
                                    {newText}
                                </div>
                                <button
                                    href={href}
                                    className="news-link save-button news-button"
                                >
                                    {name}
                                </button>
                                <div className="news-date">{formattedDate}</div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
