//home is parent, profile is child, bioEditor is grandchild
import Profilepic from "./profilepic";
import BioEditor from "./bio";

export default function Profile({
    first_name,
    last_name,
    imgURL,
    finishedBio,
    setBio,
}) {
    console.log("props", first_name, last_name, imgURL, finishedBio, setBio);
    return (
        <>
            <div className="main-profile-container">
                <div className="main-profile-image-container">
                    <img className="main-profile-photo" src={imgURL} />
                    {/* <Profilepic /> */}
                </div>
                <div className="userprofile-information-container">
                    <h2>{first_name}</h2>
                    <h2>{last_name}</h2>
                    <h2>{finishedBio}</h2>
                    <BioEditor setBio={setBio} />
                </div>
            </div>
        </>
    );
}
