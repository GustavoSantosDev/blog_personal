import Link from 'next/link';

export default function ProjectsPage() {
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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Proyectos</h1>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">Estado: {project.status}</p>
            </div>
          ))}
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