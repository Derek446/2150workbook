export default function Card({ title, children }) {
  return (
    <section className="h-full rounded border border-sky-600 bg-gray-200 shadow-sm">
      <header className="flex items-center justify-between border-b border-sky-600 px-4 py-3">
        <h2 className="leading-relaxed font-bold text-sm text-gray-900">{title}</h2>
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}