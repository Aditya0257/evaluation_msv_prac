import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAIApi from 'openai';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class EvaluationService {
  public openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi({
      apiKey: process.env.OPEN_AI_SECRET_KEY,
    });
  }

  async evaluateAnswer(attendee_id: string, ques_id: string, answer: string) {
    try {
      const prompt = `Evaluate the following answer: "${answer}" for question ID: ${ques_id}. Provide feedback and a score between 0 and 100.`;
      
      const response = await this.openaiCreateCompletion(prompt);
      // console.log("HERE 3");
      const evaluation = response.choices[0].message;
      console.log("Evaluations: ", evaluation);
      if (!evaluation) throw new Error('Evaluation failed.');

      return {
        attendee_id,
        ques_id,
        evaluation,
      };
    } catch (err) {
      throw new HttpException(
        `Failed to evaluate answer: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async openaiCreateCompletion(prompt: string) {
    // console.log("HERE 1");
    const chatCompletion = await this.openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an evaluator for academic answers.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1024,
    });
    // console.log("HERE 2");
    return chatCompletion;
  }
}
