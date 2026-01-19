const COLORS = [
  "#ff3b3b", "#ff6a00", "#ff9f1c", "#ffd60a", "#c7f000",
  "#7ae582", "#2ec4b6", "#00b4d8", "#0096c7", "#0077b6",
  "#5a4fcf", "#7b5cff", "#9d4edd", "#c77dff", "#e0aaff",
  "#ff5d8f", "#ff87ab", "#ffb3c6", "#ffd6e0", "#ffe5ec",
  "#adb5bd", "#868e96", "#495057", "#343a40", "#212529",
];

const buttons = [
  {
    name: "Registro tiempo",
    href: "https://reg-rec.vercel.app",
    external: true,
  },
  {
    name: "Registro libre",
    href: "/registro-libre",
    external: false,
  },
  {
    name: "Tarot",
    href: "/tarot-reg",
    external: false,
  },
  {
    name: "Ideas",
    href: "/ideas-reg",
    external: false,
  },
  {
    name: "Mejoras",
    href: "/mejoras-reg",
    external: false,
  },
  {
    name: "Calculadora",
    href: "/calculadora-c",
    external: false,
  },
  {
    name: "Memorias",
    href: "/memory-reg",
    external: false,
  },
  {
    name: "Sueños",
    href: "/suenos-reg",
    external: false,
  },
  {
    name: "Registro de clase",
    href: "/clase-reg",
    external: false,
  },
  {
    name: "Pensamientos irruptivos",
    href: "/irruptivos-reg",
    external: false,
  },
  {
    name: "Pensamientos temáticos",
    href: "/temas-reg",
    external: false,
  },

  ...Array.from({ length: 14 }).map((_, i) => ({
    name: `Proyecto ${i + 12}`,
    href: null,
    external: false,
  })),
];


export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 p-10">
      <h1 className="text-xl mb-8 text-white/80">Panel personal</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {buttons.map((b, i) => {
          const color = COLORS[i % COLORS.length];
          const disabled = !b.href;

          return (
            <a
              key={i}
              href={disabled ? undefined : b.href!}
              target={b.external ? "_blank" : undefined}
              rel={b.external ? "noopener noreferrer" : undefined}
              className={[
                "glow-card relative rounded-xl bg-neutral-900 p-6 text-center border",
                "transition-all duration-300 hover:scale-[1.03]",
                disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "",
              ].join(" ")}
              style={
                {
                  borderColor: color,
                  // variable que usa el glow animado (en CSS)
                  ["--glow" as any]: `${color}88`,
                } as React.CSSProperties
              }
            >
              {/* brillo extra al hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition"
                style={{ boxShadow: `0 0 28px ${color}aa` }}
              />

              <div className="relative z-10 text-sm text-white/80">{b.name}</div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
