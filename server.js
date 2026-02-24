import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Initialize Gemini client once (connection pooling)
const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

// Experience, Education, Skills data (same as client)
const experiences = [
  {
    company: 'GDIT',
    title: 'Senior Software Engineer, Full Stack',
    period: 'Nov 2025 – Present',
    location: 'Hammond, LA',
    description: [
      'Lead feature development for a Medicare & Medicaid fraud-prevention platform with 1,000+ daily active users, utilizing Angular/TypeScript, Spring Boot (Java), and PostgreSQL',
      'Refactor and modernize Angular codebase, improving component reusability and reducing duplicated logic by 20%+',
      'Drove adoption of feature flagging as part of agile process improvements, enabling smaller PRs, faster feedback cycles, and more predictable releases',
      'Improve stability of Angular/Spring Boot application, continuously reduce and prevent production defects through proactive code reviews & testing',
      'Mentor junior developers, lead process experiments, run agile development meetings, and set documentation standards',
    ],
  },
];

const education = [
  {
    school: 'Rio Salado College',
    degree: 'Associate of Science',
    field: 'Programming and Systems Analysis',
    graduationDate: 'August 2024',
    location: 'Online',
  },
  {
    school: 'University of Louisiana at Lafayette',
    degree: 'Master of Science',
    field: 'Systems Technology',
    graduationDate: 'May 2022',
    location: 'Lafayette, LA',
  },
  {
    school: 'University of Louisiana at Lafayette',
    degree: 'Bachelor of Science',
    field: 'Engineering and Technology Management',
    graduationDate: 'December 2020',
    location: 'Lafayette, LA',
  },
];

const skills = [
  { name: 'Languages', skills: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'C#'] },
  { name: 'Frontend', skills: ['Angular', 'React', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { name: 'Backend', skills: ['Spring Boot', 'Express.js', 'Node.js', 'PostgreSQL'] },
  { name: 'Tools & Platforms', skills: ['Git', 'Docker', 'Jenkins', 'Linux', 'Snowflake', 'SAP'] },
];

function generateSystemPrompt() {
  return `You are an AI assistant answering questions about Andrew Palmer's professional background.

CRITICAL RESPONSE RULES:
1. Answer ONLY what is asked - do not provide extra information
2. Keep responses SHORT and DIRECT - maximum 3-4 sentences per paragraph
3. Use ONLY these formats: simple sentences, bullet points with dashes (-), line breaks between sections
4. NEVER use bold, asterisks, headers, or markdown
5. Always use 3rd person (Andrew, He, His)
6. If asked about unrelated topics, say: "I can only discuss Andrew's professional background"

ANDREW'S INFORMATION:

EXPERIENCE:
${experiences.map((exp) => `${exp.title} at ${exp.company} | ${exp.period} | ${exp.location}
${exp.description.map((desc) => `- ${desc}`).join('\n')}`).join('\n\n')}

EDUCATION:
${education.map((edu) => `${edu.degree} in ${edu.field} from ${edu.school} (${edu.graduationDate})`).join('\n')}

SKILLS:
${skills.map((cat) => `${cat.name}: ${cat.skills.join(', ')}`).join('\n')}`;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error('VITE_GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const systemPrompt = generateSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: `Failed to process request: ${errorMsg}` });
  }
});

app.listen(PORT, () => {
  console.log(`Chat API server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/chat`);
});
