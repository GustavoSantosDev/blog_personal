import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Acerca de mí</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-700 mb-4">
            ¡Hola! Soy Gustavo Santos, estudiante de matemáticas y programador apasionado por Rust.
            Combino mi formación matemática con el desarrollo de software para crear soluciones eficientes y elegantes.
          </p>
          <p className="text-gray-700 mb-4">
            Mi interés principal está en la intersección entre las matemáticas y la programación.
            Me especializo en Rust para sistemas de alto rendimiento, pero también trabajo con tecnologías web modernas como JavaScript, TypeScript, React y Next.js.
          </p>
          <p className="text-gray-700 mb-4">
            En este sitio, comparto mis proyectos personales, artículos científicos sobre matemáticas y computación,
            tutoriales de programación y reflexiones sobre el aprendizaje continuo.
          </p>
          <p className="text-gray-700">
            Creo que el conocimiento compartido es clave para el crecimiento de la comunidad.
            ¡Espero que encuentres útil el contenido que publico aquí!
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}