import Image from "next/image";

interface ProfileHeaderProps {
  productCount: number;
}

export function ProfileHeader({ productCount }: ProfileHeaderProps) {
  const stats = [
    { value: String(productCount), label: "produtos" },
    { value: "250", label: "jovens" },
    { value: "Qui.", label: "encontro" },
  ];

  return (
    <section aria-labelledby="perfil-titulo" className="flex flex-col gap-4 px-3 py-6 sm:px-4">
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="shrink-0 rounded-full bg-dea-heart p-1">
          <Image
            src="/images/avatar-dea.svg"
            alt="Logo do Grupo de Oração Deus é Amor"
            width={96}
            height={96}
            unoptimized
            priority
            className="size-20 rounded-full border-4 border-dea-paper sm:size-28"
          />
        </div>
        <dl className="grid flex-1 grid-cols-3 gap-1 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col-reverse">
              <dt className="truncate text-xs text-dea-muted sm:text-sm">{stat.label}</dt>
              <dd className="truncate font-display text-lg font-black font-soft text-dea-blue sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col gap-1">
        <h1 id="perfil-titulo" className="font-display text-xl font-black font-soft text-dea-blue">
          Grupo de Oração Deus é Amor
        </h1>
        <p className="text-sm text-dea-muted">@deuseamor · lojinha do grupo</p>
        <p className="text-sm text-dea-ink">
          Jovens evangelizando jovens. 💙 Camisetas, terços e lembranças do grupo — retirada e
          pagamento no encontro de quinta-feira.
        </p>
      </div>
    </section>
  );
}
