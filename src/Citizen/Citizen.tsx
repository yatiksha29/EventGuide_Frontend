
import { useState } from "react";
import type { ChangeEvent } from "react";
import "./Citizen.css";
import url from "../url";

type CitizenDetails = {
  acardno: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  contact: string;
};

type OcrResponse = {
  success?: boolean;
  data?: {
    name?: string | null;
    dob?: string | null;
    gender?: string | null;
    acardno?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    pincode?: string | null;
    confidenceScore?: number | null;
  };
  message?: string;
};

function normalizeDate(value?: string | null) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (match) return `${match[3]}-${match[2]}-${match[1]}`;

  return "";
}

function Citizen() {
  const [emailid, setEmailid] = useState("");

  const [citizen, setCitizen] = useState<CitizenDetails>({
    acardno: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    contact: "",
  });

  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCitizen((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function readAadhaar(frontFile: File, backFile: File) {
    const formData = new FormData();
    formData.append("frontCard", frontFile);
    formData.append("backCard", backFile);

    try {
      const response = await fetch(`${url}/Citizen/ai-read-pic`, {
        method: "POST",
        body: formData,
      });

      const result: OcrResponse = await response.json();

      console.log("OCR HTTP status:", response.status);
      console.log("OCR full response:", result);

      if (!response.ok || result.success === false || !result.data) {
        alert(result.message || "Aadhaar details could not be extracted.");
        return;
      }

      const data = result.data;

      console.log("OCR data received:", data);

      setCitizen((prev) => ({
        ...prev,
        acardno: data.acardno || "",
        name: data.name || "",
        dob: normalizeDate(data.dob),
        gender: data.gender || "",
        address: data.address || "",
        city: data.city || "",
        contact: prev.contact,
      }));

      alert("Details extracted. Please verify them before saving.");
    } catch (err) {
      console.error("Aadhaar OCR error:", err);
      alert("Backend connection failed. Check your server and OCR route.");
    }
  }

  function handleFrontChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFrontSide(file);

    if (file && backSide) {
      void readAadhaar(file, backSide);
    }
  }

  function handleBackChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setBackSide(file);

    if (file && frontSide) {
      void readAadhaar(frontSide, file);
    }
  }

  async function handleFetch() {
    if (!emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
      const response = await fetch(`${url}/Citizen/find`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailid: emailid.trim().toLowerCase(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Citizen record not found");
        return;
      }

      const data = result.msg;

      setCitizen({
        acardno: data.acardno || "",
        name: data.name || "",
        dob: normalizeDate(data.dob),
        gender: data.gender || "",
        address: data.address || "",
        city: data.city || "",
        contact: data.contact || "",
      });

      alert("Citizen details fetched successfully!");
    } catch (err) {
      console.error("Citizen fetch error:", err);
      alert("Backend connection failed. Check your server.");
    }
  }

  function createFormData() {
    const formData = new FormData();

    formData.append("emailid", emailid.trim().toLowerCase());

    Object.entries(citizen).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (frontSide) formData.append("frontCard", frontSide);
    if (backSide) formData.append("backCard", backSide);

    return formData;
  }

  async function handleUpload() {
    if (!emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
      const response = await fetch(`${url}/Citizen/signup`, {
        method: "POST",
        body: createFormData(),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Citizen data could not be saved");
        return;
      }

      alert("Citizen data saved successfully!");
    } catch (err) {
      console.error("Citizen save error:", err);
      alert("Backend connection failed. Check your server.");
    }
  }

  async function handleModify() {
    if (!emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
        const response = await fetch(`${url}/Citizen/update`, {
        method: "POST",
        body: createFormData(),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Citizen data could not be updated");
        return;
      }

      alert("Citizen data updated successfully!");
    } catch (err) {
      console.error("Citizen update error:", err);
      alert("Backend connection failed. Check your server.");
    }
  }

  return (
    <main className="citizen-page">
      <section className="citizen-card">
        <header className="citizen-header">
          <h1>Citizen Registration</h1>
        </header>

        <div className="citizen-content">
          <div className="citizen-email">
            <label htmlFor="emailid">Email Id</label>
            <input
              id="emailid"
              type="email"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
            />
            <button
              type="button"
              className="fetch-btn"
              onClick={handleFetch}
            >
              Fetch
            </button>
          </div>

          <div className="citizen-layout">
            <aside className="citizen-uploads">
              <h2>Upload Aadhaar Card</h2>

              <div className="upload-item">
                <label className="upload-preview" htmlFor="frontSide">
                  {frontSide ? (
                    <span>{frontSide.name}</span>
                  ) : (
                    <span className="upload-icon">＋</span>
                  )}
                </label>

                <input
                  id="frontSide"
                  type="file"
                  accept="image/*"
                  onChange={handleFrontChange}
                  hidden
                />

                <label className="upload-label" htmlFor="frontSide">
                  Front Side
                </label>
              </div>

              <div className="upload-item">
                <label className="upload-preview" htmlFor="backSide">
                  {backSide ? (
                    <span>{backSide.name}</span>
                  ) : (
                    <span className="upload-icon">＋</span>
                  )}
                </label>

                <input
                  id="backSide"
                  type="file"
                  accept="image/*"
                  onChange={handleBackChange}
                  hidden
                />

                <label className="upload-label" htmlFor="backSide">
                  Back Side
                </label>
              </div>
            </aside>

            <div className="citizen-details">
              <section className="details-section">
                <div className="citizen-field">
                  <label htmlFor="acardno">Aadhaar Card Number</label>
                  <input
                    id="acardno"
                    name="acardno"
                    value={citizen.acardno}
                    readOnly
                  />
                </div>

                <div className="citizen-name-row">
                  <div className="citizen-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      value={citizen.name}
                      readOnly
                    />
                  </div>

                  <div className="citizen-field">
                    <label htmlFor="dob">DOB</label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={citizen.dob}
                      readOnly
                    />
                  </div>
                </div>

                <div className="citizen-field gender-field">
                  <label htmlFor="gender">Gender</label>
                  <input
                    id="gender"
                    name="gender"
                    value={citizen.gender}
                    readOnly
                  />
                </div>
              </section>

              <section className="details-section address-section">
                <div className="citizen-field">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    value={citizen.address}
                    readOnly
                  />
                </div>

                <div className="citizen-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    value={citizen.city}
                    readOnly
                  />
                </div>

                <div className="citizen-field">
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    id="contact"
                    type="tel"
                    name="contact"
                    value={citizen.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                  />
                </div>
              </section>
            </div>
          </div>

          <div className="citizen-actions">
            <button
              type="button"
              className="upload-data-btn"
              onClick={handleUpload}
            >
              Upload Data
            </button>

            <button
              type="button"
              className="modify-btn"
              onClick={handleModify}
            >
              Modify
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Citizen;
