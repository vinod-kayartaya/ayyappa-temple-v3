import React from 'react';
import { useSelector } from 'react-redux';

function Temples() {
  const { temples, loading } = useSelector((state) => state.temple);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Temples</h2>
      {temples.length === 0 ? (
        <p>No temples found</p>
      ) : (
        <div className="row">
          {temples.map((temple) => (
            <div key={temple.id} className="col-md-4 mb-3">
              {/* Temple card component will go here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Temples; 