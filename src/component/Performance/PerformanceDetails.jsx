import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PerformanceDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    axios.get(`/api/performance/${id}`)
      .then(res => setReview(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!review) return <p>Loading...</p>;

  return (
    <div>
      <h2>Performance Details</h2>
      <p><strong>Employee:</strong> {review.employeeId?.name}</p>
      <p><strong>Reviewer:</strong> {review.reviewerId?.name}</p>
      <p><strong>Period:</strong> {new Date(review.reviewPeriod.from).toDateString()} to {new Date(review.reviewPeriod.to).toDateString()}</p>
      <p><strong>Status:</strong> {review.status}</p>
      <h3>Ratings</h3>
      <ul>
        {Object.entries(review.ratings).map(([key, value]) => (
          <li key={key}>{key}: {value}/5</li>
        ))}
      </ul>
      <h3>Feedback</h3>
      <p><strong>Strengths:</strong> {review.feedback.strengths}</p>
      <p><strong>Improvements:</strong> {review.feedback.improvements}</p>
      <p><strong>Comments:</strong> {review.feedback.comments}</p>
    </div>
  );
};

export default PerformanceDetails;
