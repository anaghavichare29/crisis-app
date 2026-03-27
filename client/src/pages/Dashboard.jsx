import axios from "axios";

const fetchCrises = async (lat, lng) => {
  const res = await axios.get(
    `http://localhost:5000/api/crisis/nearby?lat=${lat}&lng=${lng}`
  );
  setCrises(res.data);
};