"use client";

// Root-level boundary for failures that escape the layout itself. Must render its
// own <html>/<body> because it replaces the root layout when it fires.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1.5rem", textAlign: "center", color: "#0B2238" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Something went wrong</h1>
        <p style={{ marginTop: "0.75rem", color: "#566571" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            background: "#0F9D6E",
            color: "#fff",
            border: 0,
            borderRadius: "0.5rem",
            padding: "0.7rem 1.4rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
