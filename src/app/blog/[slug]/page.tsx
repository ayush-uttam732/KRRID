import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  content: string;
  author?: string;
  image_url?: string;
  video_url?: string;
  carousel_images?: string[];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  // Ensure carousel_images is an array (Supabase may return null or a JSON string)
  let carouselImages: string[] = [];
  if (post.carousel_images) {
    if (Array.isArray(post.carousel_images)) {
      carouselImages = post.carousel_images;
    } else if (typeof post.carousel_images === 'string') {
      try {
        const parsed = JSON.parse(post.carousel_images);
        if (Array.isArray(parsed)) carouselImages = parsed;
      } catch (e) {
        // If it's a comma separated string, split it
  carouselImages = post.carousel_images.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>
      {post.author && <p className="text-gray-600 text-sm mb-2 text-center">By {post.author}</p>}
      <p className="text-gray-500 text-xs mb-6 text-center">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.image_url && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}

      {post.video_url && (
        <div className="mb-8">
          <iframe
            className="w-full aspect-video rounded-lg"
            src={post.video_url}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {carouselImages.length > 0 && (
        <div className="mb-8">
          {/* A simple carousel implementation. For a full-featured carousel, consider a dedicated library. */}
          <div className="flex overflow-x-auto space-x-4 rounded-lg">
            {carouselImages.map((imgSrc, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 relative h-64">
                <Image
                  src={imgSrc}
                  alt={`${post.title} carousel image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="prose lg:prose-xl mx-auto text-black">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
