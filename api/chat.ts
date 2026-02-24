import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Experience, Education, Skills data
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

function generateSystemPrompt(): string {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('VITE_GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // Generate response
    const systemPrompt = generateSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Set CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: `Failed to process request: ${errorMsg}` });
  }
}
