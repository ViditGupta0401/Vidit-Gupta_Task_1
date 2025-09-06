import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const sampleCourses = [
  {
    title: "React Fundamentals",
    description: "Master the basics of React including components, hooks, and state management. Perfect for beginners looking to start their React journey.",
    duration: "12 hours",
    price: 199
  },
  {
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB. Learn API development and database integration.",
    duration: "18 hours",
    price: 249
  },
  {
    title: "Full-Stack JavaScript",
    description: "Complete full-stack development course covering React, Node.js, Express, and MongoDB. Build real-world applications.",
    duration: "35 hours",
    price: 399
  }
];

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-manager';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing courses
    await Course.deleteMany({});
    
    // Insert sample courses
    await Course.insertMany(sampleCourses);
    
    console.log('Sample courses added successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
