import "./globals.css";
export const metadata = {
  title: "RoundTable Feedback",
  description: "Streamline your Monthly and RT Feedback process efficiently.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gradient-to-r from-purple-900 via-purple-800 to-blue-800 text-white">
        {children}
      </body>
    </html>
  );
}
