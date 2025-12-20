export default function PartnerLogos() {
  const partners = [
    { name: "企业A", logo: "A" },
    { name: "企业B", logo: "B" },
    { name: "企业C", logo: "C" },
    { name: "企业D", logo: "D" },
    { name: "企业E", logo: "E" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-8">
      {partners.map((partner, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
          <div className="text-white font-semibold">{partner.logo}</div>
        </div>
      ))}
    </div>
  )
}
