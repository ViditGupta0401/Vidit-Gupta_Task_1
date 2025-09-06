const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching courses: ' + error.message);
  }
};

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Error submitting form: ' + error.message);
  }
};
