import axios from "./axios";
export default function deleteProfile() {
    const deleteProfile = () => {
        console.log("Clicked");
        axios
            .post("/delete-user")
            .then(() => {
                window.location.reload();
            })
            .catch(console.log);
    };

    return (
        <button className="delete-button" onClick={deleteProfile}>
            Delete Profile
        </button>
    );
}
