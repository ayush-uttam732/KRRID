"use client";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required!');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  image_url: string;
  video_url: string;
  carousel_images: string[];
  published: boolean;
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    author: '',
    image_url: '',
    video_url: '',
    carousel_images: [],
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [isNewPost, setIsNewPost] = useState(id === 'new');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [carouselImageFiles, setCarouselImageFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (!isNewPost) {
      fetchPost();
    }
    setLoading(false);
  }, [id, isNewPost]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      // Optionally redirect or show an error message
    } else if (data) {
      setPost({
        ...data,
        carousel_images: data.carousel_images || [], // Ensure it's an array
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setPost((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadFile = async (file: File) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('blog-media')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

  // Supabase client returns an object with `data: { publicUrl }` for getPublicUrl
  const getUrlResult = supabase.storage.from('blog-media').getPublicUrl(fileName) as any;
  const publicUrl = getUrlResult?.data?.publicUrl || null;
  return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = post.image_url;
    if (imageFile) {
      const uploadedUrl = await uploadFile(imageFile);
      if(uploadedUrl) imageUrl = uploadedUrl;
    }

    let videoUrl = post.video_url;
    if (videoFile) {
      const uploadedUrl = await uploadFile(videoFile);
      if(uploadedUrl) videoUrl = uploadedUrl;
    }

    let carouselImageUrls = post.carousel_images;
    if (carouselImageFiles) {
      const uploadPromises = Array.from(carouselImageFiles).map(uploadFile);
      const uploadedUrls = await Promise.all(uploadPromises);
  const validUrls = (uploadedUrls.filter((url: string | null): url is string => url !== null)) as string[];
      if(validUrls.length > 0) carouselImageUrls = validUrls;
    }

    const postData = {
      ...post,
      image_url: imageUrl,
      video_url: videoUrl,
      carousel_images: carouselImageUrls,
    };

    if (isNewPost) {
      const { error } = await supabase.from('blog_posts').insert([postData]);
      if (error) {
        console.error('Error creating post:', error);
      } else {
        router.push('/admin/blog');
      }
    } else {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', id);
      if (error) {
        console.error('Error updating post:', error);
      } else {
        router.push('/admin/blog');
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">Loading form...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{isNewPost ? 'Create New Blog Post' : 'Edit Blog Post'}</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title ?? ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={post.slug ?? ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content (Markdown):</label>
          <textarea
            id="content"
            name="content"
            value={post.content ?? ''}
            onChange={handleChange}
            rows={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={post.author ?? ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2">Featured Image:</label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video_url" className="block text-gray-700 text-sm font-bold mb-2">Video:</label>
          <input
            type="file"
            id="video_url"
            name="video_url"
            onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="carousel_images" className="block text-gray-700 text-sm font-bold mb-2">Carousel Images:</label>
          <input
            type="file"
            id="carousel_images"
            name="carousel_images"
            multiple
            onChange={(e) => setCarouselImageFiles(e.target.files)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
          checked={Boolean(post.published)}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <label htmlFor="published" className="text-gray-700 text-sm font-bold">Published</label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {isNewPost ? 'Create Post' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
