import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Posts</h1>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                {post.excerpt && (
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                )}
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}