import axios from "./axios";
export default function deleteProfile() {
    const deleteProfile = () => {
        console.log("Clicked");
        axios.post("/delete-user");
    };

    return (
        <button className="delete-button" onClick={deleteProfile}>
            Delete Profile
        </button>
    );
}
