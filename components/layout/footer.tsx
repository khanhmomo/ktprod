import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KT</span>
              </div>
              <span className="font-semibold text-lg">KTProd Technology</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Research & Development of innovative technology solutions for event and sport photography. 
              Specializing in both software and hardware systems.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ktprod.com</li>
              <li>Technology R&D</li>
              <li>Event & Sport Photography</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 KTProd Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
