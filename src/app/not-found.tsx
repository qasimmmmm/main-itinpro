import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink text-white">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-emerald/20 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <div className="font-display text-[6rem] font-extrabold leading-none text-white/15 sm:text-[9rem]">
          404
        </div>
        <h1 className="mt-2 text-[1.8rem] font-extrabold sm:text-[2.4rem]">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[16px] text-white/60">
          The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/apply?service=llc-ein-itin" className="btn-ghost-light">
            Start your application
          </Link>
        </div>
      </div>
    </section>
  );
}
