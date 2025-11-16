import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Artículos Científicos</h1>
        {articles.length === 0 ? (
          <p className="text-gray-600">No hay artículos científicos publicados aún. ¡Próximamente!</p>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.slug} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  <Link href={`/articles/${article.slug}`} className="hover:text-blue-600">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-500 text-sm mb-4">{article.date}</p>
                {article.excerpt && (
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                )}
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Leer artículo →
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