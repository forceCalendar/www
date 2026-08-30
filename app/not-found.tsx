import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Button from "./components/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative text-center">
          <div className="font-display text-[6rem] font-semibold leading-none tracking-[-0.04em] text-hairline sm:text-[8rem]">
            404
          </div>
          <h1 className="mt-2 font-display text-display-sm text-fg">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">Go home</Button>
            <Button href="/playground" variant="secondary">
              Try Playground
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
