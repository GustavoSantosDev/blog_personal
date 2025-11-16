import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <p className="text-gray-500">{article.date}</p>
          </header>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
        <div className="mt-8">
          <Link href="/articles" className="text-blue-600 hover:text-blue-800">
            ← Back to Articles
          </Link>
        </div>
      </main>
    </div>
  );
}