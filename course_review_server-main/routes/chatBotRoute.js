const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const courses = [
  {
    name: 'Web Development Bootcamp',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    description: 'Learn full-stack web development with React, Node.js, and databases.',
  },
  {
    name: 'Data Science with Python',
    skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Matplotlib'],
    description: 'Master data science with hands-on projects using Python and its powerful libraries.',
  },
  {
    name: 'Mobile App Development',
    skills: ['React Native', 'JavaScript', 'APIs', 'Firebase'],
    description: 'Learn to build cross-platform mobile apps with React Native and integrate with Firebase.',
  },
  {
    name: 'UI/UX Design with Figma',
    skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD'],
    description: 'Design stunning UI/UX using Figma and apply industry-standard design principles.',
  },
  {
    name: 'Machine Learning A-Z',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
    description: 'Learn Machine Learning algorithms and how to build predictive models using Python.',
  },
  {
    name: 'Digital Marketing Fundamentals',
    skills: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing'],
    description: 'Learn the foundations of digital marketing and how to grow your brand online.',
  },
  {
    name: 'Blockchain Development Bootcamp',
    skills: ['Blockchain', 'Ethereum', 'Solidity', 'Smart Contracts'],
    description: 'Dive deep into Blockchain technology and learn to build decentralized applications (dApps).',
  },
  {
    name: 'Game Development with Unity',
    skills: ['C#', 'Unity', 'Game Development', '3D Modeling'],
    description: 'Create amazing 3D games using Unity and C#, covering the basics to advanced game mechanics.',
  },
  {
    name: 'Cloud Computing with AWS',
    skills: ['AWS', 'Cloud Services', 'DevOps', 'EC2', 'Lambda'],
    description: 'Learn cloud computing concepts and get hands-on experience with AWS services.',
  },
  {
    name: 'Cybersecurity Essentials',
    skills: ['Network Security', 'Penetration Testing', 'Ethical Hacking', 'Firewalls'],
    description: 'Understand the basics of cybersecurity and learn how to protect systems from cyber-attacks.',
  },
  {
    name: 'AI for Everyone',
    skills: ['AI', 'Machine Learning', 'Deep Learning', 'Python'],
    description: 'A beginner’s course to understanding artificial intelligence and its applications in real-world problems.',
  },
];

router.post('/recommend', async (req, res) => {
  try {
    const { interests, skillLevel, goals, learningStyle, platform, timeCommitment } = req.body;

    const matchedCourses = courses.filter(course => {
      return (
        course.skills.some(skill => interests.toLowerCase().includes(skill.toLowerCase())) &&
        course.skills.some(skill => skillLevel.toLowerCase().includes(skill.toLowerCase()))
      );
    });

    const courseRecommendations = matchedCourses.length
      ? matchedCourses.map(course => `${course.name}: ${course.description}`).join('\n')
      : 'Sorry, no courses found matching your skills. Please try again with more details.';

    res.json({ courseRecommendations });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ reply: 'Something went wrong!' });
  }
});

router.post('/conversation', async (req, res) => {
  const { query } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'I am looking for a course recommendation based on my skills and preferences.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Sure! Tell me about your skills and preferences so I can recommend the best course for you.' }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;
    const reply = response.text() || 'Sorry, I didn\'t get that. Could you please clarify?';

    res.json({ reply });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ reply: 'Something went wrong!' });
  }
});

module.exports = router;
