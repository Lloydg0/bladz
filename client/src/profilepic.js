export default function Profilepic({
    first_name,
    last_name,
    imgURL,
    toggleUploader,
}) {
    return (
        <>
            <img
                onClick={() => toggleUploader()}
                className="profile-pic"
                src={imgURL || "/defaultIcon.jpeg"}
                alt={first_name + " " + last_name}
            />
        </>
    );
}
