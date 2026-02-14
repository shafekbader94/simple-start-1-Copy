import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private basePrompt: string;

  constructor() {
    const promptPath = path.join(
      process.cwd(),
      'src/ai/prompts/base.prompt.md',
    );

    this.basePrompt = fs.readFileSync(promptPath, 'utf-8');

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateModule(name: string) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: this.basePrompt },
        { role: 'user', content: `Generate module named "${name}"` },
      ],
    });

    return completion.choices[0].message.content;
  }
}
