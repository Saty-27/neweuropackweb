// Aggregator file - imports all blog category files and exports a unified blog map
import { palletBlogs } from './mockBlogs-pallets-1';
import { palletBlogs2 } from './mockBlogs-pallets-2';
import { palletBlogs3 } from './mockBlogs-pallets-3';
import { palletBlogs4 } from './mockBlogs-pallets-4';
import { corrugatedBlogs1 } from './mockBlogs-corrugated-1';
import { corrugatedBlogs2 } from './mockBlogs-corrugated-2';
import { seaworthyBlogs1 } from './mockBlogs-seaworthy-1';
import { seaworthyBlogs2 } from './mockBlogs-seaworthy-2';
import { crateBlogs } from './mockBlogs-crates';
import { shrinkBlogs } from './mockBlogs-shrink';
import { localBlogs } from './mockBlogs-local';
import type { BlogEntry } from './blogTemplate';

// Merge all blog entries into a single map
export const allMockBlogs: Record<string, BlogEntry> = {
  ...palletBlogs,
  ...palletBlogs2,
  ...palletBlogs3,
  ...palletBlogs4,
  ...corrugatedBlogs1,
  ...corrugatedBlogs2,
  ...seaworthyBlogs1,
  ...seaworthyBlogs2,
  ...crateBlogs,
  ...shrinkBlogs,
  ...localBlogs,
};

// Helper to get a blog by slug
export function getMockBlogBySlug(slug: string): BlogEntry | undefined {
  return allMockBlogs[slug];
}

// Get all blogs as an array
export function getAllMockBlogs(): BlogEntry[] {
  return Object.values(allMockBlogs);
}

// Get blogs by category
export function getMockBlogsByCategory(category: string): BlogEntry[] {
  return Object.values(allMockBlogs).filter(blog => blog.category === category);
}

// Get all unique categories
export function getMockBlogCategories(): string[] {
  const cats = new Set(Object.values(allMockBlogs).map(b => b.category));
  return Array.from(cats);
}
