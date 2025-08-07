import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerformanceForm = () => {
  const [form, setForm] = useState({
    employeeId: '',
    reviewerId: '',
    reviewPeriod: { from: '', to: '' },
    ratings: {
      communication: 3,
      teamwork: 3,
      leadership: 3,
      technical: 3,
      overall: 3
    },
    feedback: {
      strengths: '',
      improvements: '',
      comments: ''
    },
    status: 'draft'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setForm({ ...form, [keys[0]]: { ...form[keys[0]], [keys[1]]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/performance', form);
    navigate('/admin/performance');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Performance Review</h2>
      <input name="employeeId" placeholder="Employee ID" onChange={handleChange} />
      <input name="reviewerId" placeholder="Reviewer ID" onChange={handleChange} />
      <input name="reviewPeriod.from" type="date" onChange={handleChange} />
      <input name="reviewPeriod.to" type="date" onChange={handleChange} />
      <textarea name="feedback.strengths" placeholder="Strengths" onChange={handleChange} />
      <textarea name="feedback.improvements" placeholder="Improvements" onChange={handleChange} />
      <textarea name="feedback.comments" placeholder="Comments" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PerformanceForm;
