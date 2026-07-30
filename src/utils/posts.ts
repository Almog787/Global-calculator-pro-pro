export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  icon?: string;
  image?: string;
  content: string;
}

function parseFrontmatter(fileContent: string): { data: any, content: string } {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: fileContent };
  
  const frontmatter = match[1];
  const content = match[2].trim();
  
  const data: any = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Basic parsing for strings and arrays
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
         value = value.slice(1, -1).split(',').map(s => {
           let v = s.trim();
           if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
           if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
           return v;
         }) as any;
      }
      data[key] = value;
    }
  });
  
  return { data, content };
}

export function getAllPosts(): Post[] {
  // Use Vite's import.meta.glob to read all markdown files as raw strings
  const files = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
  
  const posts: Post[] = [];
  
  for (const path in files) {
    // Skip README
    if (path.toLowerCase().endsWith('readme.md')) continue;

    const rawContent = files[path] as string;
    const { data, content } = parseFrontmatter(rawContent);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    posts.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      icon: data.icon,
      image: data.image,
      content
    });
  }
  
  // Sort by date (basic string comparison or real date parse)
  // For simplicity, we can just sort by putting the newest first if we parse dates
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
