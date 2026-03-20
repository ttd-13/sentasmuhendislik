interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

export default function Card({ title, description, icon, href }: CardProps) {
  const content = (
    <div className="relative h-full p-6 bg-white rounded-md border border-navy-200 shadow-sm cursor-pointer transform-gpu transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)] group-hover:border-[#0089b6]">
      <span className="absolute top-4 right-4 text-[#8ca0a8] opacity-0 scale-95 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-[#0089b6] transition-all duration-200 ease-out">
        <svg
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M11.5 4.5H15.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.2 4.8L9.2 10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5.5H5.8C5.248 5.5 4.8 5.948 4.8 6.5V14.2C4.8 14.752 5.248 15.2 5.8 15.2H13.5C14.052 15.2 14.5 14.752 14.5 14.2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {icon && <div className="mb-4 text-cyan-500">{icon}</div>}
      <h3 className="text-xl font-semibold text-navy-900 mb-3 max-w-[calc(100%-32px)]">{title}</h3>
      <p className="text-navy-700 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block h-full">
        {content}
      </a>
    );
  }

  return <div className="group h-full">{content}</div>;
}
