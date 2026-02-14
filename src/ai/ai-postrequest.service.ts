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
    // Fake AI generation
    const capitalized = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const moduleName = capitalized(name);

    const files = [
      {
        filename: `${name}.module.ts`,
        content: `import { Module } from '@nestjs/common';
import { ${moduleName}Service } from './${name}.service';
import { ${moduleName}Controller } from './${name}.controller';

@Module({
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
`,
      },
      {
        filename: `${name}.service.ts`,
        content: `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${moduleName}Service {}
`,
      },
      {
        filename: `${name}.controller.ts`,
        content: `import { Controller } from '@nestjs/common';
import { ${moduleName}Service } from './${name}.service';

@Controller('${name}')
export class ${moduleName}Controller {
  constructor(private readonly service: ${moduleName}Service) {}
}
`,
      },
    ];

    // Save files to folder `src/generated/${name}`
    const outputDir = path.join(process.cwd(), 'src/generated', name);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    files.forEach((file) => {
      fs.writeFileSync(path.join(outputDir, file.filename), file.content);
    });

    return `Module "${name}" generated in src/generated/${name}`;
  }
}
