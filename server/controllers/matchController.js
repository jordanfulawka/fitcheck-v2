const { Anthropic } = require('@anthropic-ai/sdk');
const pdf = require('pdf-parse-new');
require('dotenv').config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

exports.getMatchScore = async (req, res) => {
  try {
    if (!req.body.jobDescription || !req.file.buffer) {
      throw new Error('missing files');
    }
    const jobDescription = req.body.jobDescription;
    const uploadedFile = req.file.buffer;
    const resumeContent = await pdf(uploadedFile);

    const prompt = `
    You are a professional resume and job description analyzer.

    You will be given a resume and a job description. Your job is to analyze how well the candidate's resume matches the job description and return a structured JSON evaluation.

    Resume:
    ${resumeContent.text}

    Job Description:
    ${jobDescription}

    Analyze the above and return ONLY a valid JSON object with no additional text, explanation, or markdown formatting. The JSON must follow this exact shape:

    {
      "matchScore": <integer from 0 to 100 representing overall fit>,
      "matchedSkills": [<list of skills or keywords that appear in both the resume and job description>],
      "missingSkills": [<list of skills or keywords required by the job that are absent from the resume>],
      "strengths": [<list of reasons why this candidate is a strong fit for the role>],
      "gaps": [<list of specific weaknesses or missing qualifications relative to the job requirements>],
      "recommendation": "<a 2-3 sentence paragraph suggesting how the candidate could improve their resume or profile to better match this role>"
    }

    Do not include any text outside of the JSON object. Do not wrap it in markdown code blocks. Return only raw JSON. Absolutely no markdown. No code blocks. No backticks.
    `;

    const output = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });
    let formattedOutput = output.content[0].text.replace('```json', '');
    formattedOutput = formattedOutput.replace('```', '');
    formattedOutput = formattedOutput.trim();
    const obj = JSON.parse(formattedOutput);
    res.status(200).json({
      status: 'success',
      message: obj,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
