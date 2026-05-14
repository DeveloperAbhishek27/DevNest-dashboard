export default function AuthLayout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/login.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-brand/30 to-brand/40" />

      <div className="relative z-10 min-h-screen ">{children}</div>
    </div>
  );
}
