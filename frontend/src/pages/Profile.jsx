import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {

    const navigate = useNavigate();
    let storedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        const updatedUser = { ...user };

        if (!updatedUser.accountType) {
            updatedUser.accountType = "Customer";
        }

        if (!updatedUser.memberSince) {
            updatedUser.memberSince = new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long"
            });
        }

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

    }, []);

    const [user, setUser] = useState(storedUser);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(user.image || "");

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            const updatedUser = { ...user, image: reader.result };
            setImage(reader.result);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        };

        if (file) reader.readAsDataURL(file);
    };

    const saveName = () => {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEdit(false);
    };

    return (
        <div style={container}>

            <div style={card}>

                {/* Profile Image */}
                <div style={avatarWrapper}>

                    {image ? (
                        <img src={image} alt="profile" style={avatarImage} />
                    ) : (
                        <div style={avatar}>{user.name[0]}</div>
                    )}

                    {/* Upload button */}
                    <label style={uploadButton}>
                        +
                        <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />
                    </label>

                </div>

                {/* Name + edit button */}
                <div style={nameRow}>

                    {edit ? (
                        <>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={input}
                            />
                            <button style={saveBtn} onClick={saveName}>✔</button>
                        </>
                    ) : (
                        <>
                            <h3 style={{ margin: 0 }}>{user.name}</h3>
                            <span style={{ ...editIcon, textDecoration: "underline" }} onClick={() => setEdit(true)}>edit</span>
                        </>
                    )}

                </div>

                <p><b>Email:</b> {user.email}</p>
                <p><b>Account Type:</b> {user.accountType}</p>
                <p><b>Member Since:</b> {user.memberSince}</p>



                <div style={{ marginTop: "20px" }}>


                    <button
                        style={{ ...button, background: "#ff4f81" }}
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

const container = {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const card = {
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px"
};

const avatarWrapper = {
    position: "relative",
    width: "90px",
    height: "90px",
    margin: "auto",
    marginBottom: "15px"
};

const avatar = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#ff4f81",
    color: "white",
    fontSize: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const avatarImage = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover"
};

const uploadButton = {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "grey",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "bold"
};

const nameRow = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
};

const editIcon = {
    cursor: "pointer",
    fontSize: "14px"
};

const input = {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const saveBtn = {
    border: "none",
    background: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "5px 8px"
};
const button = {
    width: "30%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "9px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
};


export default Profile;