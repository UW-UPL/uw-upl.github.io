import fs from 'fs';
import path from 'path';

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(filePath, arrayOfFiles);
    } else if (path.extname(file) === '.md') {
      const relativePath = path.relative(path.join(process.cwd(), 'src/content/resources'), filePath);
      arrayOfFiles.push(relativePath);
    }
  });

  return arrayOfFiles;
}

export function generateResourceRedirects() {
  const redirects: Record<string, string> = {
    "/hours.html": "/hours",
    "/blog.html": "/blog",
    "/coords": "/about",

    "/2022/02/25/incorrect-reification.html": "/blog/incorrect-reification.html",
    "/2022/02/02/learning-to-code-with-projects.html": "/blog/learning-to-code-with-projects.html",
    "/2022/02/09/a-cautionary-tale-of-amazon-web-service-classes.html": "/blog/a-cautionary-tale-of-amazon-web-service-classes.html",
    "/2022/03/17/exploiting-github-actions.html": "/blog/exploiting-github-actions.html",
    "/2022/04/03/why-i-use-firefox.html": "/blog/why-i-use-firefox.html",
    "/2022/04/16/Game-Design-and-Education.html": "/blog/game-design-and-education.html",
    "/2022/04/7/Artificial-Consciousness-and-Phenomenology.html": "/blog/artificial-consciousness-and-phenomenology.html",
    "/2022/05/12/Using-GPT3-To-Write-A-Blog-Post.html": "/blog/using-gpt3-to-write-a-blog-post.html",

    "/blog/incorrect-reification": "/blog/incorrect-reification.html",
    "/blog/learning-to-code-with-projects": "/blog/learning-to-code-with-projects.html",
    "/blog/a-cautionary-tale-of-amazon-web-service-classes": "/blog/a-cautionary-tale-of-amazon-web-service-classes.html",
    "/blog/exploiting-github-actions": "/blog/exploiting-github-actions.html",
    "/blog/why-i-use-firefox": "/blog/why-i-use-firefox.html",
    "/blog/game-design-and-education": "/blog/game-design-and-education.html",
    "/blog/artificial-consciousness-and-phenomenology": "/blog/artificial-consciousness-and-phenomenology.html",
    "/blog/using-gpt3-to-write-a-blog-post": "/blog/using-gpt3-to-write-a-blog-post.html",
  };

  const contentDir = path.join(process.cwd(), 'src/content/resources');
  const markdownFiles = getAllMarkdownFiles(contentDir);

  markdownFiles.forEach((file) => {
    const normalizedPath = file.split(path.sep).join('/');
    redirects[`/${normalizedPath}`] = `/${normalizedPath.replace(/\.md$/, '')}`;
  });

  return redirects;
}
