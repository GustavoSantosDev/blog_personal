import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getAllArticles } from '@/lib/articles';

export default async function Home() {
  const posts = await getAllPosts();
  const articles = await getAllArticles();

  const projects = [
    {
      title: "Algoritmos de Optimización en Rust",
      description: "Implementación de algoritmos de optimización matemática en Rust, enfocados en rendimiento y precisión.",
      technologies: ["Rust", "Matemáticas"],
      status: "En desarrollo"
    },
    {
      title: "Visualizador de Funciones Matemáticas",
      description: "Aplicación web para visualizar funciones matemáticas en 2D y 3D usando WebGL.",
      technologies: ["JavaScript", "WebGL", "React"],
      status: "Completado"
    },
    {
      title: "Biblioteca de Criptografía",
      description: "Biblioteca en Rust para operaciones criptográficas básicas y avanzadas.",
      technologies: ["Rust", "Criptografía"],
      status: "Planificado"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-semibold mb-4">
            Gustavo Santos
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Estudiante de matemáticas y programador de Rust. Comparto mis conocimientos en desarrollo de software, matemáticas y proyectos personales.
          </p>
        </header>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Acerca de mí</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              ¡Hola! Soy Gustavo Santos, estudiante de matemáticas y programador apasionado por Rust.
              Combino mi formación matemática con el desarrollo de software para crear soluciones eficientes y elegantes.
            </p>
            <p>
              Mi interés principal está en la intersección entre las matemáticas y la programación.
              Me especializo en Rust para sistemas de alto rendimiento, pero también trabajo con tecnologías web modernas como JavaScript, TypeScript, React y Next.js.
            </p>
            <p>
              En este sitio, comparto mis proyectos personales, artículos científicos sobre matemáticas y computación,
              tutoriales de programación y reflexiones sobre el aprendizaje continuo.
            </p>
            <p>
              Creo que el conocimiento compartido es clave para el crecimiento de la comunidad.
              ¡Espero que encuentres útil el contenido que publico aquí!
            </p>
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Blog</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">No hay posts aún. ¡Próximamente!</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <div className="flex items-baseline gap-4">
                    <time className="text-sm text-gray-500 min-w-[100px]">{post.date}</time>
                    <Link href={`/posts/${post.slug}`} className="text-lg hover:underline">
                      {post.title}
                    </Link>
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-600 mt-2 ml-[116px]">{post.excerpt}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Artículos Científicos</h2>
          {articles.length === 0 ? (
            <p className="text-gray-600">No hay artículos científicos publicados aún. ¡Próximamente!</p>
          ) : (
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <div className="flex items-baseline gap-4">
                    <time className="text-sm text-gray-500 min-w-[100px]">{article.date}</time>
                    <Link href={`/articles/${article.slug}`} className="text-lg hover:underline">
                      {article.title}
                    </Link>
                  </div>
                  {article.excerpt && (
                    <p className="text-gray-600 mt-2 ml-[116px]">{article.excerpt}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Proyectos</h2>
          <ul className="space-y-6">
            {projects.map((project, index) => (
              <li key={index}>
                <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-sm text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{project.status}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
