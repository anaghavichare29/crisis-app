import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

function HelpSupport({ dark, setDark }) {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchContacts = async () => {
    const res = await axios.get(
      "https://crisis-backend-8zo1.onrender.com/api/contacts",
    );
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSave = async () => {
    if (!name || !phone) return;

    if (editId) {
      await axios.put(
        `https://crisis-backend-8zo1.onrender.com/api/contacts/${editId}`,
        { name, phone },
      );
    } else {
      await axios.post(
        "https://crisis-backend-8zo1.onrender.com/api/contacts",
        { name, phone },
      );
    }

    setName("");
    setPhone("");
    setEditId(null);
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(
      `https://crisis-backend-8zo1.onrender.com/api/contacts/${id}`,
    );
    fetchContacts();
  };

  const editContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact._id);
  };

  const emergencyContacts = [
    { name: "Police", phone: "100" },
    { name: "Fire Brigade", phone: "101" },
    { name: "Ambulance", phone: "102" },
    { name: "Disaster Management", phone: "108" },
    { name: "Women Helpline", phone: "1091" },
    { name: "Child Helpline", phone: "1098" },
    { name: "Senior Citizen", phone: "14567" },
    { name: "Cyber Crime", phone: "1930" },
    { name: "Mental Health", phone: "9152987821" },
    { name: "Road Accident", phone: "1073" },
    { name: "Gas Leak", phone: "1906" },
    { name: "Electricity Emergency", phone: "1912" },
    { name: "Railway Helpline", phone: "139" },
    { name: "Tourist Helpline", phone: "1363" },
    { name: "Coast Guard", phone: "1554" },
  ];

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-gray-900 text-white p-6"
          : "min-h-screen bg-gradient-to-br from-blue-100 to-white p-6"
      }
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate("/dashboard")}>
          <IoMdArrowRoundBack
            size={25}
            className={dark ? "text-white" : "text-blue-700"}
          />
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Emergency Support
      </h1>

      {/* TOP CONTACTS */}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">
        Top Emergency Contacts
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {emergencyContacts.map((c, i) => (
          <div
            key={i}
            className={`${dark ? "bg-gray-800 text-white" : "bg-white"} p-5 rounded-xl shadow flex items-center justify-between`}
          >
            {/* LEFT */}
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className={dark ? "text-gray-300" : "text-gray-600"}>
                {c.phone}
              </p>
            </div>

            {/* RIGHT ICON */}
            <a
              href={`tel:${c.phone}`}
              className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FaPhoneAlt size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* PERSONAL CONTACTS */}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">
        Your Emergency Contacts
      </h2>

      {/* FORM */}
      <div className="flex gap-3 mb-6">
        <input
          className={`border p-2 rounded w-full ${dark ? "bg-gray-800 text-white border-gray-600" : ""}`}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={`border p-2 rounded w-full ${dark ? "bg-gray-800 text-white border-gray-600" : ""}`}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleSave}
          className={`px-4 text-white rounded ${editId ? "bg-yellow-500" : "bg-green-600"}`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* CONTACT CARDS */}
      <div className="grid md:grid-cols-3 gap-5">
        {contacts.map((c) => (
          <div
            key={c._id}
            className={`${dark ? "bg-gray-800 text-white" : "bg-white"} p-5 rounded-xl shadow`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{c.name}</p>
                <p className={dark ? "text-gray-300" : "text-gray-500"}>
                  {c.phone}
                </p>
              </div>

              <a
                href={`tel:${c.phone}`}
                className="bg-green-600 text-white p-3 rounded-full"
              >
                <FaPhoneAlt />
              </a>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => editContact(c)}
                className="flex items-center gap-1 text-yellow-500"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => deleteContact(c._id)}
                className="flex items-center gap-1 text-red-500"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpSupport;
