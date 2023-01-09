// Permet à TypeScript de reconnaitre les imports de fichiers .scss
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
