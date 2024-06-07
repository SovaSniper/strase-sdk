import { defineConfig } from 'tsup';

// tsup index.ts --format cjs,esm --dts
export default defineConfig({
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm']
});