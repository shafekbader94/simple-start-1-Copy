import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
//const fetch = require('node-fetch');

// 1. Read prompt.md
const promptPath = path.join(process.cwd(), 'prompt.md');
if (!fs.existsSync(promptPath)) {
  console.error('prompt.md not found!');
  process.exit(1);
}
const promptContent = fs.readFileSync(promptPath, 'utf8');

// 2. Extract module name from prompt
const moduleMatch = promptContent.match(/Module:\s*(\w+)/i);
if (!moduleMatch) {
  console.error('Module name not found in prompt.md! Add "Module: <name>"');
  process.exit(1);
}
const moduleName = moduleMatch[1].toLowerCase();

async function generate() {
  try {
    // 3. Call Ollama API
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

    // 4. Create folder src/modules/<moduleName>
    const folderPath = path.join(process.cwd(), 'src', 'modules', moduleName);
    fs.mkdirSync(folderPath, { recursive: true });

    // 5. Extract code blocks and file names
    // Ollama often outputs like:
    // ```ts
    // // projects.module.ts
    // <code>
    // ```
    const codeBlocks = code.split(/```ts|```typescript/).filter(c => c.trim());
    for (const block of codeBlocks) {
      const cleaned = block.replace(/```/g, '').trim();
      if (!cleaned) continue;

      // Try to detect filename from first line: "// projects.service.ts"
      const lines = cleaned.split(/\r?\n/);
      let firstLine = lines[0].trim();
      let fileName = `${moduleName}_${Math.random().toString(36).substring(2, 6)}.ts`; // fallback
      if (firstLine.startsWith('//')) {
        const match = firstLine.match(/\/\/\s*(.+\.ts)/);
        if (match) fileName = match[1].trim();
        // Remove comment line from code
        lines.shift();
      }

      const finalCode = lines.join('\n');
      const filePath = path.join(folderPath, fileName);
      fs.writeFileSync(filePath, finalCode);
      console.log(`Generated: ${filePath}`);
    }

    console.log('All code generated successfully!');
  } catch (err) {
    console.error('Generation failed:', err.message);
  }
}

generate();
