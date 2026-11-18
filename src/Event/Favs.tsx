
import { useEffect, useState } from "react";
import "./Favs.css";
import url from "../url";

type Vendor = {
  _id?: string;
  emailid: string;
  business?: string;
  name?: string;
  contact?: string;
  city?: string;
  area?: string;
  address?: string;
  shoppicurl?: string;
};

type FavsProps = {
  onBack: () => void;
  onFavsChange: (emails: string[]) => void;
};

function Favs({ onBack, onFavsChange }: FavsProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [message, setMessage] = useState("");

  // Fetch favourite vendors
  useEffect(() => {
    async function getFavs() {
      try {
        let token = localStorage.getItem("token");

        if (!token) {
          setMessage("Please login again.");
          return;
        }

        const response = await fetch(
          `${url}/Favs/list`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.status) {
          setVendors(data.data || []);

          const emails = (data.data || []).map(
            (vendor: Vendor) => vendor.emailid
          );

          onFavsChange(emails);
        } else {
          setMessage(data.msg || "Unable to fetch favourites.");
        }
      } catch (error) {
        console.log(error);
        setMessage("Unable to connect to server.");
      }
    }

    getFavs();
  }, [onFavsChange]);

  // Remove favourite vendor
  async function handleRemove(emailid: string) {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login again.");
        return;
      }

      const response = await fetch(
        `${url}/Favs/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            vendorEmail: emailid,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        setVendors((previous) =>
          previous.filter((vendor) => vendor.emailid !== emailid)
        );

        onFavsChange(data.data || []);
      } else {
        setMessage(data.msg || "Unable to remove favourite.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Unable to connect to server.");
    }
  }

  return (
    <div className="favs-page">

      <main className="favs-container">
        <p className="favs-tag">YOUR SAVED VENDORS</p>

        <h1>My Favourites ❤️</h1>

        <p className="favs-description">
          All your favourite vendors in one place.
        </p>

        {message && <p>{message}</p>}

        {vendors.length > 0 ? (
          <div className="favs-grid">
            {vendors.map((vendor) => (
              <div
                className="favs-card"
                key={vendor._id || vendor.emailid}
              >
                {vendor.shoppicurl &&
                vendor.shoppicurl !== "nopic.jpg" ? (
                  <img
                    className="favs-image"
                    src={vendor.shoppicurl}
                    alt={vendor.business || "Vendor"}
                  />
                ) : (
                  <div className="favs-image favs-no-image">
                    ✧
                  </div>
                )}

                <div className="favs-card-content">
                  <h2>{vendor.business || "Business Name"}</h2>

                  <p>
                    <strong>Owner:</strong>{" "}
                    {vendor.name || "Not provided"}
                  </p>

                  <p>
                    <strong>Email:</strong> {vendor.emailid}
                  </p>

                  <p>
                    <strong>Contact:</strong>{" "}
                    {vendor.contact || "Not provided"}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {vendor.city || "Not provided"}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {vendor.area || "Not provided"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {vendor.address || "Not provided"}
                  </p>

                  <button
                    type="button"
                    className="favs-remove-button"
                    onClick={() => handleRemove(vendor.emailid)}
                  >
                    ♥ Remove from Favourites
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="favs-empty">
            <div className="favs-empty-heart">♡</div>
            <h2>No favourites yet</h2>
            <p>Like a vendor to see them here.</p>

            <button
              type="button"
              className="favs-back-button"
              onClick={onBack}
            >
              Find Vendors
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Favs;
