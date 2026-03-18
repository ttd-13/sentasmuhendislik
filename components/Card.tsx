interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

export default function Card({ title, description, icon, href }: CardProps) {
  const content = (
    <div className="h-full p-6 bg-white rounded-md border border-navy-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition-all">
      {icon && <div className="mb-4 text-cyan-500">{icon}</div>}
      <h3 className="text-xl font-semibold text-navy-900 mb-3">{title}</h3>
      <p className="text-navy-700 leading-relaxed">{description}</p>
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
