import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
          </header>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <div className="mt-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </Link>
        </div>
      </main>
    </div>
  );
}