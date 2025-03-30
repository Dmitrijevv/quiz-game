import Header from "@/components/ui/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
    {children}
    </>
        
  );
}
