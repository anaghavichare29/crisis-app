import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

function HelpSupport() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔄 Fetch contacts

  const fetchContacts = async () => {
    const res = await axios.get("https://crisis-backend-8zo1.onrender.com/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ➕ Add / ✏️ Update
  const handleSave = async () => {
    if (!name || !phone) return;

    if (editId) {
      await axios.put(`https://crisis-backend-8zo1.onrender.com/api/contacts/${editId}`, {
        name,
        phone,
      });
    } else {
      await axios.post("https://crisis-backend-8zo1.onrender.com/api/contacts", {
        name,
        phone,
      });
    }

    setName("");
    setPhone("");
    setEditId(null);
    fetchContacts();
  };

  // ❌ Delete
  const deleteContact = async (id) => {
    await axios.delete(`https://crisis-backend-8zo1.onrender.com/api/contacts/${id}`);
    fetchContacts();
  };

  // ✏️ Edit
  const editContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact._id);
  };

  // 🌍 Emergency contacts
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-white px-4 py-2 rounded"
      >
        <IoMdArrowRoundBack color="blue" size={23}/>
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Emergency Support
      </h1>

      {/* 🚨 TOP CONTACTS */}
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Top Emergency Contacts</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {emergencyContacts.map((c, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-gray-600">{c.phone}</p>
            </div>

            <a
              href={`tel:${c.phone}`}
              className="bg-blue-600 text-white p-3 rounded-full"
            >
              <FaPhoneAlt size={18}/>
            </a>
          </div>
        ))}
      </div>

      {/* 👤 PERSONAL CONTACTS */}
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Emergency Contacts</h2>

      {/* FORM */}
      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-full capitalize"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full capitalize"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleSave}
          className={`px-4 text-white rounded ${
            editId ? "bg-yellow-500" : "bg-green-600"
          }`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* CONTACT CARDS */}
      {contacts.length === 0 ? (
        <p className="text-gray-500">No personal contacts added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* TOP SECTION */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {c.name}
                  </p>
                  <p className="text-gray-500">{c.phone}</p>
                </div>

                {/* CALL ICON */}
                <a
                  href={`tel:${c.phone}`}
                  className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700"
                >
                  <FaPhoneAlt size={15}/>
                </a>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editContact(c)}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => deleteContact(c._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HelpSupport;
