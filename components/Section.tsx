interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'pattern';
  id?: string;
}

export default function Section({ children, className = '', background = 'white', id }: SectionProps) {
  const bgClasses = {
    white: 'bg-navy-50',
    gray: 'bg-white',
    pattern: 'bg-navy-50 bg-[linear-gradient(to_right,#b8b8b820_1px,transparent_1px),linear-gradient(to_bottom,#b8b8b820_1px,transparent_1px)] bg-[size:24px_24px]'
  };

  return (
    <section id={id} className={`py-16 lg:py-24 ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
