import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

function AllLawyers({ isUserAuthenticated }) {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedContactInfo, setSelectedContactInfo] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch lawyers data from the API
    fetch("http://localhost:5000/api/lawyer/getAllLawyers")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Lawyers found") {
          setLawyers(data.lawyers);

          setMessage(data.message);
        } else {
          setMessage("Lawyers aren't available");
        }
      })
      .catch((error) => {
        console.error("Error fetching lawyers:", error);
      });
  }, []);

  const openLawyerInfo = (lawyer) => {
    setSelectedLawyer(lawyer);
    setSelectedContactInfo(null);
  };

  const openContactInfo = (lawyer) => {
    setSelectedContactInfo(lawyer);
    setSelectedLawyer(null);
  };

  const closeInfo = () => {
    setSelectedLawyer(null);
    setSelectedContactInfo(null);
  };

  return (
    <div className="relative">
      {isUserAuthenticated ? (
        <>
          <div className="relative">
            <h1 className="text-4xl text-purple-800 font-bold mt-0 mx-auto mb-0">
              Available Lawyers
            </h1>
            {message === "Lawyers found" ? (
              <div className="absolute top-0 right-0 mt-8 mr-8 flex items-center">
                <Link to="/search-lawyer-by-case">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-3">
                    Search Lawyer by Case Domain
                  </button>
                </Link>
                <Link to="/search-lawyer-by-location">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-purple-600">
                    Search Lawyer by Location
                  </button>
                </Link>
              </div>
            ) : (
              <p className="text-red-500 mt-4 text-center">{message}</p>
            )}
            {message === "Lawyers found" && (
              <div className="mt-12 mx-auto max-w-screen-xl">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th className="py-2 px-4">Lawyer Full Name</th>
                      <th className="py-2 px-4">Location</th>
                      <th className="py-2 px-4">Case Domain</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lawyers.map((lawyer) => (
                      <tr key={lawyer._id} className="bg-purple-100">
                        <td className="py-2 px-4 font-semibold text-black">
                          {lawyer.firstName} {lawyer.lastName}
                        </td>
                        <td className="py-2 px-4 font-semibold text-black">
                          {lawyer.location}
                        </td>
                        <td className="py-2 px-4 font-semibold text-black">
                          {lawyer.caseDomain}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button
                              className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              onClick={() => openLawyerInfo(lawyer)}
                            >
                              More Info
                            </button>
                            <button
                              className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                              onClick={() => openContactInfo(lawyer)}
                            >
                              Contact Lawyer
                            </button>
                            <button className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                              Chat Room
                            </button>
                            <button className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-green-600">
                              Request Lawyer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedLawyer && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl">
                  <h2 className="text-xl font-semibold text-purple-800 mb-2">
                    Lawyer Information
                  </h2>
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src={selectedLawyer.image}
                        alt={`${selectedLawyer.firstName} ${selectedLawyer.lastName}'s image`}
                        className="h-32 w-32 object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p>
                        Name:{" "}
                        <strong>
                          {selectedLawyer.firstName} {selectedLawyer.lastName}
                        </strong>
                      </p>
                      <p>
                        Location: <strong>{selectedLawyer.location}</strong>
                      </p>
                      <p>
                        Cases Handled:{" "}
                        <strong>{selectedLawyer.caseDomain}</strong>
                      </p>
                      <p>
                        Year of joining:{" "}
                        <strong>{selectedLawyer.yearOfJoining}</strong>
                      </p>
                      <p>
                        Achievements:
                        <ul>
                          {selectedLawyer.achievements.map(
                            (achievement, index) => (
                              <li key={index}>
                                <strong>{achievement}</strong>
                              </li>
                            )
                          )}
                        </ul>
                      </p>
                      <p>
                        Qualifications:
                        <ul>
                          {selectedLawyer.qualifications.map(
                            (qualification, index) => (
                              <li key={index}>
                                <strong>{qualification}</strong>
                              </li>
                            )
                          )}
                        </ul>
                      </p>
                      <p>
                        Bio: <strong>{selectedLawyer.bio}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={closeInfo}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {selectedContactInfo && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl">
                  <h2 className="text-xl font-semibold text-purple-800 mb-2">
                    Contact Us
                  </h2>
                  <p>
                    Current Location:{" "}
                    <strong>{selectedContactInfo.location}</strong>
                  </p>
                  <p>
                    Phone Number: <strong>{selectedContactInfo.phoneNo}</strong>
                  </p>
                  <p>
                    Email Address:{" "}
                    <strong>{selectedContactInfo.emailAddress}</strong>
                  </p>
                  <button
                    className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={closeInfo}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        // If not authenticated, redirect to the home page
        <Navigate to="/" />
      )}
    </div>
  );
}

export default AllLawyers;
