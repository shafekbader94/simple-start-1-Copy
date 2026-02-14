import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const promptPath = path.join(process.cwd(), 'prompt.md');
if (!fs.existsSync(promptPath)) {
  console.error('prompt.md not found!');
  process.exit(1);
}
const promptContent = fs.readFileSync(promptPath, 'utf8');

// Extract module name from prompt.md
const moduleMatch = promptContent.match(/Module:\s*(\w+)/i);
if (!moduleMatch) {
  console.error('Module name not found in prompt.md! Add "Module: <name>"');
  process.exit(1);
}
const moduleName = moduleMatch[1].toLowerCase();

async function generate() {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: promptContent,
        stream: false,
      }),
    });

    if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);

    const code = data.response;

    const baseFolder = path.join(process.cwd(), 'src', 'modules', moduleName);
    const dtoFolder = path.join(baseFolder, 'dto');
    fs.mkdirSync(baseFolder, { recursive: true });
    fs.mkdirSync(dtoFolder, { recursive: true });

    // Regex to parse Ollama output: **<filename.ts>**\n```ts ... ```
    const blockRegex = /\*\*(.+\.ts)\*\*\s*```(?:ts|typescript)?\s*([\s\S]+?)```/g;
    let match;

    const importsMap = {
      controllers: [],
      services: [],
      entities: [],
      dto: []
    };

    while ((match = blockRegex.exec(code)) !== null) {
      const originalFile = match[1].trim();
      const fileCode = match[2].trim();
      let targetPath;

      // DTOs go under dto/
      if (originalFile.toLowerCase().includes('dto')) {
        targetPath = path.join(dtoFolder, originalFile);
        importsMap.dto.push(originalFile.replace('.ts', ''));
      } else if (originalFile.includes('.module.ts')) {
        // module file renamed to <moduleName>.module.ts
        targetPath = path.join(baseFolder, `${moduleName}.module.ts`);
      } else {
        // everything else stays in module folder
        targetPath = path.join(baseFolder, originalFile);
      }

      fs.writeFileSync(targetPath, fileCode);
      console.log(`Generated: ${targetPath}`);
    }

    // ===== Auto-update module file with imports =====
    const moduleFile = path.join(baseFolder, `${moduleName}.module.ts`);
    if (fs.existsSync(moduleFile)) {
      let moduleContent = fs.readFileSync(moduleFile, 'utf8');

      // Auto-import entities
      importsMap.entities.forEach(entity => {
        moduleContent = `import { ${entity} } from './${entity}.ts';\n` + moduleContent;
      });

      // Auto-import services
      importsMap.services.forEach(service => {
        moduleContent = `import { ${service} } from './${service}.ts';\n` + moduleContent;
      });

      // Auto-import controllers
      importsMap.controllers.forEach(controller => {
        moduleContent = `import { ${controller} } from './${controller}.ts';\n` + moduleContent;
      });

      // Auto-fill TypeOrmModule.forFeature with entities
      if (importsMap.entities.length > 0) {
        moduleContent = moduleContent.replace(
          /imports:\s*\[\s*TypeOrmModule\.forFeature\(\[\]\)\s*\]/,
          `imports: [TypeOrmModule.forFeature([${importsMap.entities.join(', ')}])]`
        );
      }

      fs.writeFileSync(moduleFile, moduleContent);
      console.log(`Updated module imports in: ${moduleFile}`);
    }

    // ===== Auto-update controllers with DTO imports =====
    importsMap.controllers.forEach(controller => {
      const controllerFile = path.join(baseFolder, `${controller}.ts`);
      if (fs.existsSync(controllerFile)) {
        let content = fs.readFileSync(controllerFile, 'utf8');

        // Add necessary imports at the top
        const controllerImports = `import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';\n`;
        content = controllerImports + content;

        // Import DTOs
        importsMap.dto.forEach(dto => {
          content = `import { ${dto} } from './dto/${dto}.ts';\n` + content;
        });

        // Import entities
        importsMap.entities.forEach(entity => {
          content = `import { ${entity} } from './${entity}.ts';\n` + content;
        });

        fs.writeFileSync(controllerFile, content);
        console.log(`Updated DTO/entity imports in: ${controllerFile}`);
      }
    });

    // ===== Auto-update services with DTO & entity imports =====
    importsMap.services.forEach(service => {
      const serviceFile = path.join(baseFolder, `${service}.ts`);
      if (fs.existsSync(serviceFile)) {
        let content = fs.readFileSync(serviceFile, 'utf8');

        // Add necessary imports for DTOs and entities
        importsMap.dto.forEach(dto => {
          content = `import { ${dto} } from './dto/${dto}.ts';\n` + content;
        });

        importsMap.entities.forEach(entity => {
          content = `import { ${entity} } from './${entity}.ts';\n` + content;
        });

        fs.writeFileSync(serviceFile, content);
        console.log(`Updated DTO/entity imports in: ${serviceFile}`);
      }
    });

    console.log('✅ All files generated and wired with DTOs, entities, services, and controllers!');
  } catch (err) {
    console.error('Generation failed:', err.message);
  }
}

generate();
