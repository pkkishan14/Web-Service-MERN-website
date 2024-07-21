import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
// import { deleteContactById } from "../../../server/controllers/admin-controller";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const { authorizationToken, API } = useAuth();

  // Fetching all contact user messages
  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log("object");
      if (response.ok) {
        console.log("Response recieved");
        const data = await response.json();
        console.log("HI: ", data);
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("Fetched data is not an array");
          setContacts([]);
        }
      } else {
        console.error("Failed to fetch contacts", response.statusText);
        setContacts([]);
      }
    } catch (error) {
      console.log(error);
      setContacts([]);
    }
  };

  // defining the function deletContactById
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Not Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // hook used to call funtion
  useEffect(() => {
    getContactsData();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Contact Data </h1>
        </div>
        <div className="container  admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(contacts) && contacts.length > 0 ? (
                contacts.map((curUser, index) => {
                  return (
                    <tr key={index}>
                      <td>{curUser.username}</td>
                      <td>{curUser.email}</td>
                      <td>{curUser.message}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => deleteContactById(curUser._id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No contacts available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
