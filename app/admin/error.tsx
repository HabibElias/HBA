"use client";
import { Button } from "@/components/ui/button";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="admin-standalone">
      <h1>The workspace could not load.</h1>
      <p>Try again. If the problem continues, contact the website owner.</p>
      <Button className="admin-button primary" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
