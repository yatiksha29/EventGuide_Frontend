
import { useState } from "react";
import type { ChangeEvent } from "react";
import "./Vendor_Regis.css";
import url from "../url";

function Vendor_Regis() {
  const [vendor, setVendor] = useState({
    emailid: "",
    name: "",
    contact: "",
    business: "",
    area: "",
    address: "",
    city: "",
    estd: "",
    website: "",
    insta: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [shopPic, setShopPic] = useState<File | null>(null);
  const [certPic, setCertPic] = useState<File | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setVendor((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
    const selected = e.target.value;

    if (selected && !categories.includes(selected)) {
      setCategories((prev) => [...prev, selected]);
    }

    e.target.value = "";
  }

  function createFormData() {
    const formData = new FormData();

    Object.entries(vendor).forEach(([key,value]) => {
      formData.append(key,value);
    });

    formData.append("selcate", JSON.stringify(categories));

    if(shopPic) {
      formData.append("shoppic", shopPic);
    }

    if (certPic) {
      formData.append("certpic", certPic);
    }

    return formData;
  }

    //Fetch existing vendor using Email Id
    async function handleFetch() {
    if (!vendor.emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
      const response = await fetch(`${url}/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailid: vendor.emailid.trim().toLowerCase(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Vendor record not found");
        return;
      }

      const data = result.msg;

      setVendor({
        emailid: data.emailid || "",
        name: data.name || "",
        contact: data.contact || "",
        business: data.business || "",
        area: data.area || "",
        address: data.address || "",
        city: data.city || "",
        estd: data.estd || "",
        website: data.website || "",
        insta: data.insta || "",
      });

      setCategories(
        Array.isArray(data.selcate) ? data.selcate : []
      );

      // Existing uploaded files remain on the server.
      // Select a new file only if you want to replace it.
      setShopPic(null);
      setCertPic(null);

      alert("Vendor details fetched successfully!");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Backend connection failed. Check your server.");
    } 
  }

  //Save new Vendor
  async function handleSave() {
    if (!vendor.emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        body: createFormData(),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Vendor could not be saved");
        console.error("Save error:", result);
        return;
      }

      alert("Vendor saved successfully!");
      console.log("Saved vendor:", result.data);
    } catch (err) {
      console.error("Save error:", err);
      alert("Backend connection failed. Check your server.");
    } 
  }

  async function handleUpdate() {
    if (!vendor.emailid.trim()) {
      alert("Please enter Email Id");
      return;
    }

    try {
      const response = await fetch(`${url}/update`, {
        method: "POST",
        body: createFormData(),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.msg || "Vendor could not be updated");
        console.error("Update error:", result);
        return;
      }

      alert("Vendor updated successfully!");
      console.log("Updated vendor:", result.data);
    } catch (err) {
      console.error("Update error:", err);
      alert("Backend connection failed. Check your server.");
    } 
  }

  return (
    <div className="vendor-page">
      <div className="vendor-box">
        <h2>Vendor Registration</h2>

        {/* ROW 1: Email Id */}
        <div className="vendor-grid">
          <div className="vendor-field">
            <label htmlFor="emailid">Email Id</label>

            <div className="email-row">
              <input
                id="emailid"
                type="email"
                name="emailid"
                value={vendor.emailid}
                onChange={handleChange}
              />

              <button type="button" onClick={handleFetch}>
                Fetch
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Name and Contact Number */}
        <div className="vendor-grid">
          <div className="vendor-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={vendor.name}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="contact">Contact Number</label>
            <input
              id="contact"
              type="tel"
              name="contact"
              value={vendor.contact}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3>Business Details:-</h3>

        <div className="vendor-grid">
          <div className="vendor-field">
            <label htmlFor="business">Business Name</label>
            <input
              id="business"
              name="business"
              value={vendor.business}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="area">Area</label>
            <input
              id="area"
              name="area"
              value={vendor.area}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              value={vendor.address}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={vendor.city}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="estd">Estd. in</label>
            <input
              id="estd"
              name="estd"
              value={vendor.estd}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="vendor-grid category-grid">
          <div className="vendor-field">
            <label htmlFor="categories">Select Business Categories</label>

            <select
              id="categories"
              defaultValue=""
              onChange={handleCategory}
            >
              <option value="">Select category</option>
              <option value="Cake">Cake</option>
              <option value="Decoration">Decoration</option>
              <option value="Catering">Catering</option>
              <option value="Photography">Photography</option>
              <option value="Flowers">Flowers</option>
              <option value="Live Music">Live Music</option>
              <option value="Return Gifts">Return Gifts</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="DJ">DJ</option>
              <option value="Event Planner">Event Planner</option>
              <option value="Sound System">Sound System</option>
              <option value="Stage Setup">Stage Setup</option>
              <option value="Projector">Projector</option>
              <option value="Ring Decoration">Ring Decoration</option>
              <option value="Pandit">Pandit</option>
              <option value="Wedding Planner">Wedding Planner</option>
              <option value="Pooja Samagri">Pooja Samagri</option>
              <option value="Mehndi Artist">Mehndi Artist</option>
              <option value="Bridal Wear">Bridal Wear</option>
            </select>
          </div>

          <div className="vendor-field">
            <label>Selected Categories</label>

            <div className="selected-box">
              {categories.map((category) => (
                <span className="category-item" key={category}>
                  {category}

                  <button
                    type="button"
                    aria-label={`Remove ${category}`}
                    onClick={() =>
                      setCategories((prev) =>
                        prev.filter((item) => item !== category)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="vendor-field">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              value={vendor.website}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="insta">Insta Id</label>
            <input
              id="insta"
              name="insta"
              value={vendor.insta}
              onChange={handleChange}
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="shopPic">Shop Pic</label>
            <input
              id="shopPic"
              className="file-box"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setShopPic(e.target.files?.[0] ?? null)
              }
            />
          </div>

          <div className="vendor-field">
            <label htmlFor="certPic">Business Certificate(if Any)</label>
            <input
              id="certPic"
              className="file-box"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setCertPic(e.target.files?.[0] ?? null)
              }
            />
          </div>
        </div>

        <div className="vendor-buttons">
          <button type="button" onClick={handleSave}>
            Save
          </button>

          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vendor_Regis;
