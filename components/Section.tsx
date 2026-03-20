interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'pattern';
  id?: string;
}

export default function Section({ children, className = '', background = 'white', id }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-[#f7f9fb]',
    pattern: 'bg-[#f7f9fb]'
  };

  return (
    <section id={id} className={`py-16 lg:py-24 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
