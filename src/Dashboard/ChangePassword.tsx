
import { useState } from "react";
import "./ChangePassword.css";
import url from "../url";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // VERIFY OLD PASSWORD

    async function verifyPassword() {

        if (!oldPassword) {
            setMessage("Please enter your old password");
            return;
        }

        try {
            let response = await fetch(
                url + "/User/verify-old-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        oldPassword: oldPassword
                    })
                }
            );

            let data = await response.json();

            if (data.status) {
                setVerified(true);
                setMessage("Old password verified successfully");
            } else {
                setVerified(false);
                setMessage(data.message);
            }

        } catch (error) {
            setMessage("Unable to verify password");
        }
    }


    // CHANGE PASSWORD

    async function handleChangePassword() {

        if (!newPassword || !confirmPassword) {
            setMessage("Please fill both password fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match");
            return;
        }

        try {
            let response = await fetch(
                url + "/User/change-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword
                    })
                }
            );

            let data = await response.json();

            if (data.status) {
                setMessage(data.message);

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setVerified(false);

            } else {
                setMessage(data.message);
            }

        } catch (error) {
            setMessage("Unable to change password");
        }
    }


    return (
        <div className="change-password-page">

            <div className="change-password-card">

                <h2>Change Password</h2>

                <p className="password-description">
                    Keep your account secure by updating your password.
                </p>

                <div className="password-field">

                    <label>Old Password</label>

                    <input
                        type="password"
                        placeholder="Enter your old password"
                        value={oldPassword}
                        onChange={(e) => {
                            setOldPassword(e.target.value);
                            setVerified(false);
                            setMessage("");
                        }}
                        disabled={verified}
                    />

                </div>

                {!verified && (
                    <button
                        className="verify-password-btn"
                        onClick={verifyPassword}
                    >
                        Verify Old Password
                    </button>
                )}

                {verified && (
                    <>
                        <div className="password-field">

                            <label>New Password</label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                        </div>

                        <div className="password-field">

                            <label>Confirm New Password</label>

                            <input
                                type="password"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="change-password-btn"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                    </>
                )}

                {message && (
                    <p className="password-message">{message}</p>
                )}

            </div>

        </div>
    );
}

export default ChangePassword;
