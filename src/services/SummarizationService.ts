import { GoogleGenerativeAI } from '@google/generative-ai';
import { ISummarizationService, ApiError } from '@/types';
import { ENV_VARS, ERROR_MESSAGES, GEMINI_CONFIG } from '@/utils/constants';
import { sanitizeText, retry } from '@/utils/helpers';

export class SummarizationService implements ISummarizationService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor() {
    const apiKey = ENV_VARS.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: GEMINI_CONFIG.MODEL });
  }

  async summarizeContent(content: string): Promise<string> {
    try {
      const sanitizedContent = sanitizeText(content);
      
      if (!sanitizedContent || sanitizedContent.length < 50) {
        throw new Error('Content is too short to summarize');
      }

      const prompt = this.buildSummarizationPrompt(sanitizedContent);
      
      const result = await retry(async () => {
        const response = await this.model.generateContent(prompt);
        const text = response.response.text();
        
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response from AI model');
        }
        
        return text;
      });

      return result.trim();
    } catch (error) {
      console.error('Error in summarization:', error);
      
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : ERROR_MESSAGES.SUMMARIZATION_FAILED,
        status: 500,
      };
      
      throw apiError;
    }
  }

  private buildSummarizationPrompt(content: string): string {
    return `
You are an expert podcast summarizer. Please provide a comprehensive yet concise summary of the following podcast episode content.

Content to summarize:
${content}

Please provide a summary that includes:
1. Main topics discussed
2. Key insights and takeaways
3. Important points mentioned
4. Overall theme and purpose

Format the summary in a clear, structured manner with bullet points where appropriate. Keep it informative but concise (around 200-300 words).

Summary:
`;
  }
} 