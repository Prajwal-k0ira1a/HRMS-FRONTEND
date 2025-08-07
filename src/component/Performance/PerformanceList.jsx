import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PerformanceList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/performance')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Performance Reviews</h2>
      <Link to="/admin/performance/create">Create New Review</Link>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            {review.employeeId?.name} — {review.status}
            <Link to={`/admin/performance/${review._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceList;
