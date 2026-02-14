import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateModule(name: string) {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `
You are a professional NestJS backend generator.

Generate:
- module
- service
- controller
- entity
- create DTO
- update DTO

Rules:
- Use TypeScript
- Follow NestJS best practices
- No explanations
- Only code

Generate module named "${name}"
        `,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}
