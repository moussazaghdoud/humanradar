import Nav from '@/components/ui/Nav';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pb-20">{children}</div>
      <Nav />
    </>
  );
}
