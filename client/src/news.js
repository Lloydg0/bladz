import axios from "./axios";
import { useState, useEffect } from "react";

export default function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/news").catch(console.log);
            setNews(data);
        })();
    }, []);
    return (
        <>
            <h1 className="news-header">Market News</h1>
            <div className="news-flex-container">
                <div className="news-container">
                    {news &&
                        news.slice(0, 24).map(({ href, text, time, name }) => {
                            const newText = text.slice(0, -23);
                            let date = new Date(time);
                            let formattedDate = new Intl.DateTimeFormat(
                                "en-GB",
                                {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                }
                            ).format(date);
                            return (
                                <div className="news-box" key={time}>
                                    <img
                                        src="searchnews.png"
                                        className="news-img"
                                    ></img>
                                    <div className="news-description">
                                        {newText}
                                    </div>
                                    <a className="news-a-tag" href={href}>
                                        <button className="news-link save-button news-button">
                                            {name}
                                        </button>
                                    </a>
                                    <div className="news-date">
                                        {formattedDate}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
