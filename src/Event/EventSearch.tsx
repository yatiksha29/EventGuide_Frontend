
import { useEffect, useState } from "react";
import "./EventSearch.css";
import Favs from "./Favs";
import url from "../url";

function EventSearch() {
  const [cities, setCities] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [eventName, setEventName] = useState("");
  const [service, setService] = useState("");
  const [vendors, setVendors] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  //For Wishlist
  const [likedVendors, setLikedVendors] = useState<string[]>([]); //keep liked vendor email list
  const [showFavs, setShowFavs] = useState(false);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const vendorsPerPage = 1;
  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  const startIndex = (currentPage - 1) * vendorsPerPage;

  const currentVendors = vendors.slice(
    startIndex,
    startIndex + vendorsPerPage
  );

  //Star Rating
  const [vendorRatings, setVendorRatings] = useState<
  Record<string, { averageRating: number; totalReviews: number }>
  >({});

  const [ratingVendor, setRatingVendor] = useState("");
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingMessage, setRatingMessage] = useState("");
  //--------------------------------------------------------

  useEffect(() => {
    fetch(`${url}/Vendor/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data.data || []))
      .catch((err) => console.log(err));

    fetch(`${url}/Event/list`)
      .then((res) => res.json())
      .then((data) => setEvents(data.data || []))
      .catch((err) => console.log(err));
  }, []);

  
// -------- Favs --------------
useEffect(() => {
  let token = localStorage.getItem("token");

  if (!token) {
    setLikedVendors([]);
    return;
  }

  fetch(`${url}/Favs/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) 
      {
        const emails = (data.data || []).map(
          (vendor: any) => vendor.emailid
        );

        setLikedVendors(emails);
      }
    })
    .catch((err) => console.log(err));
}, []);

//------ Star Rating Review ------------------
useEffect(() => {
  const fetchRatings = async () => {
    try {
      const ratingData = await Promise.all(
        vendors.map(async (vendor) => {
          if (!vendor.emailid) return null;

          const response = await fetch(
            `${url}/Rating/${encodeURIComponent(vendor.emailid)}`
          );

          if (!response.ok) return null;

          const data = await response.json();

          return {
            email: vendor.emailid,
            averageRating: data.averageRating || 0,
            totalReviews: data.totalReviews || 0,
          };
        })
      );

      const ratingsMap: Record<
        string,
        { averageRating: number; totalReviews: number }
      > = {};

      ratingData.forEach((rating) => {
        if (rating) {
          ratingsMap[rating.email] = {
            averageRating: rating.averageRating,
            totalReviews: rating.totalReviews,
          };
        }
      });

      setVendorRatings(ratingsMap);
    } catch (error) {
      console.log("Error fetching ratings:", error);
    }
  };

  if (vendors.length > 0) {
    fetchRatings();
  } else {
    setVendorRatings({});
  }
}, [vendors]);

//----------------------------------------------------------------------
//----------------- Rating --------------------------
async function submitRating(vendorEmail: string) {
  let token = localStorage.getItem("token");

  if (!token) {
    setRatingMessage("Please login again.");
    return;
  }

  try {
    const response = await fetch(`${url}/Rating/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        vendorEmail,
        stars: ratingStars,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status === false) {
      setRatingMessage(
        data.message || data.msg || "Unable to submit rating."
      );
      return;
    }

    setRatingMessage("Rating submitted successfully!");

    const ratingResponse = await fetch(
      `${url}/Rating/${encodeURIComponent(vendorEmail)}`
    );

    if (ratingResponse.ok) {
      const updatedRating = await ratingResponse.json();

      setVendorRatings((prev) => ({
        ...prev,
        [vendorEmail]: updatedRating,
      }));
    }
  } catch (error) {
    console.log(error);
    setRatingMessage("Server error. Please try again.");
  }
}
//----------------------------------------------------------------

  function handleEventChange(value: string) {
    setEventName(value);
    setService("");
    setVendors([]);
    setMessage("");
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCurrentPage(1);

    if (!city || !eventName || !service) {
      setVendors([]);
      setMessage("Please select city, event and service.");
      return;
    }

    setMessage("");

    //----- jwt -----
    let token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login again.");
      return;
    }
    //---------------
    fetch(`${url}/Vendor/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        city,
        eventName,
        service,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === false) {
          setVendors([]);
          setMessage(data.msg || "No vendors found.");
        } else {
          setVendors(data.data || []);

          if (!data.data || data.data.length === 0) {
            setMessage("No vendors found for this service.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setVendors([]);
        setMessage("Unable to fetch vendors.");
      });
  }

  const selectedEvent = events.find(
    (item) => item.eventName === eventName
  );

  const services = selectedEvent ? selectedEvent.services : [];

  if (showFavs) {
    return (
      <Favs
        onBack={() => setShowFavs(false)}
        onFavsChange={setLikedVendors}
      />
    );
  } 

  return (
    <div className="event-page">
      <nav className="event-navbar">
        <a href="/" className="event-logo">
          EventGuide
        </a>

        <div className="event-nav-links">
          <a href="/">Home</a>
          <a href="#find-services" className="nav-active">
            Find Services
          </a>
          <a href="#vendor-results">Vendors</a>
        </div>
        <button
            type="button"
            className="favourites-btn"
            onClick={() => setShowFavs(true)}
          >
            My Favourites❤️
          </button>
      </nav>

      <main className="event-container">
        <div className="eventguide-layout">
          <section className="search-panel" id="find-services">
            <p className="section-tag">LET'S GET STARTED</p>
            <h2>Find Vendors</h2>

            <p className="panel-description">
              Select your city, event and required service to find
              matching vendors.
            </p>

            <form onSubmit={handleSearch}>
              <div className="event-input-group">
                <label htmlFor="city">Select City</label>

                <select
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setVendors([]);
                    setMessage("");
                  }}
                >
                  <option value="">Choose city</option>

                  {cities.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="event-input-group">
                <label htmlFor="event">Select Event</label>

                <select
                  id="event"
                  value={eventName}
                  onChange={(e) =>
                    handleEventChange(e.target.value)
                  }
                >
                  <option value="">Choose event</option>

                  {events.map((item, index) => (
                    <option
                      key={item._id || index}
                      value={item.eventName}
                    >
                      {item.eventName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="event-input-group">
                <label htmlFor="service">Select Service</label>

                <select
                  id="service"
                  value={service}
                  disabled={!eventName}
                  onChange={(e) => {
                    setService(e.target.value);
                    setVendors([]);
                    setMessage("");
                  }}
                >
                  <option value="">Choose service</option>

                  {services.map((item: string, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="event-submit-button">
                Search Vendors <span>→</span>
              </button>
            </form>

            {message && (
              <p className="event-message">{message}</p>
            )}
          </section>

          <section
            className="vendor-results-panel"
            id="vendor-results"
          >
            <div className="results-title">
              <div>
                <p className="section-tag">SEARCH RESULTS</p>
                <h2>Available Vendors</h2>

                {eventName && (
                  <div className="selected-event-heading">
                    <h3>{eventName}</h3>
                    <p>
                      Services for your selected event will appear here.
                    </p>
                  </div>
                )}
              </div>

              <span className="results-count">
                {vendors.length}{" "}
                {vendors.length === 1 ? "vendor" : "vendors"}
              </span>
            </div>

            {vendors.length > 0 ? (
            <>
              <div className="vendor-card-grid">
                {currentVendors.map((item, index) => (
                  <div
                    className="event-vendor-card"
                    key={item._id || index}
                  >
                    <div className="vendor-card-image">
                      {item.shoppicurl &&
                      item.shoppicurl !== "nopic.jpg" ? (
                        <img
                          src={item.shoppicurl}
                          alt={item.business || "Vendor"}
                        />
                      ) : (
                        <div className="vendor-image-placeholder">
                          <span>✧</span>
                          <p>No Image Available</p>
                        </div>
                      )}
                    </div>

                    <div className="vendor-card-content">

                    <div className="vendor-title-row">
                      <h3 className="vendor-business-name">
                        {item.business || "Business Name"}
                      </h3>

                      {/* --- Like button Functionality --- */}
                      <button type="button"
                        className="vendor-like-button"
                        onClick={async () => {
                          let token = localStorage.getItem("token");

                          if(!token) {
                            setMessage("Please enter your email first.");
                            return;
                          }
                          try {
                                const response = await fetch(`${url}/Favs/toggle`, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({
                                    vendorEmail: item.emailid,
                                  }),
                                });

                                const data = await response.json();

                                if (data.status) {
                                  setLikedVendors(data.data || []);
                                } else {
                                  setMessage(data.msg || "Unable to update favourites.");
                                }
                              } catch (error) {
                                console.log(error);
                                setMessage("Unable to connect to server.");
                              }
                            }}
                          >
                            {likedVendors.includes(item.emailid) ? "❤️" : "♡"}
                          </button>
                        </div>

                        {/* Star Rating */}
                        <div className="vendor-rating-row">
                          <span className="rating-stars">
                            ⭐ {vendorRatings[item.emailid]?.averageRating ?? 0}/5
                          </span>

                          <span className="rating-reviews">
                            ({vendorRatings[item.emailid]?.totalReviews ?? 0} reviews)
                          </span>
                          
                          <button
                            type="button"
                            className="rate-vendor-btn"
                            onClick={() => {
                              setRatingVendor(
                                ratingVendor === item.emailid ? "" : item.emailid);
                              setRatingStars(5);
                              setRatingMessage("");
                            }}
                          >
                            {ratingVendor === item.emailid ? "Close Rating" : "☆ Rate Vendor"}
                          </button>
                        </div>

                      <div className="vendor-details">
                        <p>
                          <strong>Owner Name</strong>
                          <span>{item.name || "Not provided"}</span>
                        </p>

                        <p>
                          <strong>Email ID</strong>
                          <span>
                            {item.emailid ? (
                              <a href={`mailto:${item.emailid}`}>
                                {item.emailid}
                              </a>
                            ) : (
                              "Not provided"
                            )}
                          </span>
                        </p>

                        <p>
                          <strong>Contact Number</strong>
                          <span>
                            {item.contact ? (
                              <a href={`tel:${item.contact}`}>
                                {item.contact}
                              </a>
                            ) : (
                              "Not provided"
                            )}
                          </span>
                        </p>

                        <p>
                          <strong>City</strong>
                          <span>{item.city || "Not provided"}</span>
                        </p>

                        <p>
                          <strong>Area</strong>
                          <span>{item.area || "Not provided"}</span>
                        </p>

                        <p>
                          <strong>Full Address</strong>
                          <span>{item.address || "Not provided"}</span>
                        </p>

                        <p>
                          <strong>Website</strong>
                          <span>
                            {item.website ? (
                              <a
                                href={
                                  /^https?:\/\//i.test(item.website)
                                    ? item.website
                                    : `https://${item.website}`
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.website}
                              </a>
                            ) : (
                              "Not provided"
                            )}
                          </span>
                        </p>

                        <p>
                          <strong>Instagram ID</strong>
                          <span>
                            {item.insta ? (
                              <a
                                href={
                                  /^https?:\/\//i.test(item.insta)
                                    ? item.insta
                                    : `https://www.instagram.com/${item.insta.replace(/^@/, "")}/`
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.insta}
                              </a>
                            ) : (
                              "Not provided"
                            )}
                          </span>
                        </p>
                      </div>

                      <div className="vendor-all-categories">
                        <strong>ALL REGISTERED CATEGORIES</strong>

                        <div className="vendor-category-list">
                          {(Array.isArray(item.selcate)
                            ? item.selcate
                            : []
                          ).map(
                            (
                              category: string,
                              categoryIndex: number
                            ) => (
                              <span key={categoryIndex}>
                                {category}
                              </span>
                            )
                          )}

                        </div>
                      
                      </div>

                      {/* --- Rating Panel --- */}
                        {ratingVendor === item.emailid && (
                            <div className="vendor-rating-panel">
                              <h4>Rate {item.business}</h4>
                              <p>Select your rating out of 5</p>

                              <div className="rating-star-select">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    className={star <= ratingStars ? "star active" : "star"}
                                    onClick={() => setRatingStars(star)}
                                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>

                              <div className="rating-form-actions">
                                <button
                                  type="button"
                                  className="submit-rating-btn"
                                  onClick={() => submitRating(item.emailid)}
                                >
                                  Submit Rating
                                </button>

                                <button
                                  type="button"
                                  className="cancel-rating-btn"
                                  onClick={() => setRatingVendor("")}
                                >
                                  Cancel
                                </button>
                              </div>

                              {ratingMessage && (
                                <p className="rating-message">{ratingMessage}</p>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
              
              {/*---------------------------------------------------------*/}
              {vendors.length > vendorsPerPage && (
                <div className="vendor-pagination">
                  <button
                    className="page-btn"
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`page-btn ${
                        currentPage === page ? "active-page" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="page-btn"
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
            ) : (
              <div className="vendor-empty-state">
                <div className="empty-icon">✧</div>

                <h3>
                  {message
                    ? "No matching vendors"
                    : "Find your perfect vendor"}
                </h3>

                <p>
                  {message ||
                    "Choose your city, event and service on the left. Matching vendors will appear here."}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="event-footer">
        <a href="/" className="event-logo">
          EventGuide
        </a>

        <p>Find the right vendors for your special moments.</p>
      </footer>
    </div>
  );
}

export default EventSearch;
