import BioEditor from "./bio";
// import Wall from "./wall";

export default function Profile({
    first_name,
    last_name,
    imgURL,
    finishedBio,
    setBio,
    // id,
}) {
    console.log("props", first_name, last_name, imgURL, finishedBio, setBio);
    return (
        <>
            <div className="profile-card">
                <div className="profile">
                    <img src={imgURL} className="profile-card-img"></img>
                    <h3 className="profile-card-name">
                        {first_name} {last_name}
                    </h3>
                    <div className="profile-card-description-container">
                        <p className="profile-card-description">
                            {finishedBio}
                        </p>
                    </div>

                    <BioEditor setBio={setBio} />
                </div>
            </div>
        </>
    );
}
