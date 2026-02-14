import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AiService {
  private basePrompt: string;

  constructor() {
    const promptPath = path.join(
      process.cwd(),
      'src/ai/prompts/base.prompt.md',
    );

    this.basePrompt = fs.readFileSync(promptPath, 'utf-8');
  }

  async generateModule(name: string) {
    // Simulate AI generation
    return `
---- PROMPT USED ----
${this.basePrompt}

---- GENERATED CODE ----

// ${name}.module.ts
@Module({
  controllers: [${capitalize(name)}Controller],
  providers: [${capitalize(name)}Service],
})
export class ${capitalize(name)}Module {}


// ${name}.service.ts
@Injectable()
export class ${capitalize(name)}Service {}


// ${name}.controller.ts
@Controller('${name}')
export class ${capitalize(name)}Controller {}
`;
  }
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
