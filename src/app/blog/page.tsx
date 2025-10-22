import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required!');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  image_url?: string;
  author?: string;
}

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, created_at, title, slug, image_url, author')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return <div className="container mx-auto p-4">Error loading posts.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post: BlogPost) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black">
            {post.image_url && (
              <div className="relative w-full h-48">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-black">{post.title}</h2>
              {post.author && <p className="text-gray-700 text-sm mb-2">By {post.author}</p>}
              <p className="text-gray-600 text-xs">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
