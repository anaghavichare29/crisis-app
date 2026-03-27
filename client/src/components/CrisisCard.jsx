function CrisisCard({ crisis }) {
  return (
    <div className="bg-white shadow p-3 rounded mt-3">
      <img src={crisis.image} className="h-40 w-full object-cover" />
      <h2 className="text-blue-600">{crisis.title}</h2>
      <p>{crisis.description}</p>
    </div>
  );
}

export default CrisisCard;