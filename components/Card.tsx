interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

export default function Card({ title, description, icon, href }: CardProps) {
  const content = (
    <div className="h-full p-6 bg-white rounded-lg border border-navy-200 hover:border-cyan-500 hover:shadow-lg transition-all">
      {icon && <div className="mb-4 text-cyan-600">{icon}</div>}
      <h3 className="text-xl font-semibold text-navy-900 mb-3">{title}</h3>
      <p className="text-navy-600 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
