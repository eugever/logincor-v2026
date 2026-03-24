import Image from "next/image";
import Script from "next/script";
import GaleriaCarrusel from "./components/GaleriaCarrusel";
import SGEHooks from "./components/SGEHooks";
import SucursalMap from "./components/SucursalMap";
import ArgentinaMapWrapper from "./components/ArgentinaMapWrapper";
import { PROVINCE_LOCALITIES } from "@/app/lib/localities";

const sucursales = [
  {
    nombre: "Casa Central",
    ciudad: "Córdoba",
    direccion: "Av. de Circunvalación Agustín Tosco 5000",
    detalle: "X5000 Córdoba, Argentina",
    address: "Av. de Circunvalación Agustín Tosco 5000, X5000 Córdoba, Argentina",
    horarios: ["Lun–Vie: 8 a 18hs", "Sáb: 8 a 12hs"],
    telefono: "0351 7000710",
    telHref: "tel:+543517000710",
    mail: "info@logincor.com.ar",
  },
  {
    nombre: "Depósito Buenos Aires",
    ciudad: "CABA",
    direccion: "Ferré 2351",
    detalle: "Villa Soldati, CABA",
    address: "Ferré 2351, Villa Soldati, Buenos Aires, Argentina",
    horarios: ["Lun–Vie: 8 a 17hs corrido"],
    telefono: "011 5263-9815",
    telHref: "tel:+541152639815",
    mail: "info@logincor.com.ar",
  },
  {
    nombre: "Depósito Rosario",
    ciudad: "Rosario",
    direccion: "Río de Janeiro 2510",
    detalle: "Rosario, Santa Fe",
    address: "Río de Janeiro 2510, Rosario, Santa Fe, Argentina",
    horarios: ["Lun–Vie: 8 a 17hs corrido"],
    telefono: "0351 7000710",
    telHref: "tel:+543517000710",
    mail: "info@logincor.com.ar",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://logincor.com.ar/#organization",
      name: "LOGINCOR",
      legalName: "LOGINCOR",
      url: "https://logincor.com.ar",
      logo: {
        "@type": "ImageObject",
        url: "https://logincor.com.ar/logo.svg",
        caption: "LOGINCOR — Transporte y Logística Industrial",
      },
      description:
        "Empresa líder en transporte de cargas de Buenos Aires a Córdoba con envíos en 24 horas, Seguimiento Satelital, Plataforma Hidráulica, Fulfillment y avisos por WhatsApp en cada etapa del envío.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. de Circunvalación Agustín Tosco 5000",
        addressLocality: "Córdoba",
        postalCode: "X5000",
        addressCountry: "AR",
      },
      telephone: "+543517000710",
      email: "info@logincor.com.ar",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+543517000710",
          contactType: "customer service",
          areaServed: "AR",
          availableLanguage: "Spanish",
        },
        {
          "@type": "ContactPoint",
          telephone: "+543513117484",
          contactType: "customer service",
          contactOption: "WhatsApp",
          areaServed: "AR",
          availableLanguage: "Spanish",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "08:00",
          closes: "12:00",
        },
      ],
      areaServed: Object.entries(PROVINCE_LOCALITIES).flatMap(([province, locs]) =>
        locs.map(loc => ({ "@type": "City", name: loc.name, addressRegion: province, addressCountry: "AR" }))
      ),
      serviceType: [
        "Transporte de cargas",
        "Logística industrial",
        "Rastreo satelital de flota",
        "Fulfillment",
        "Almacenamiento",
        "Descarga con plataforma hidráulica",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://logincor.com.ar/#sucursal-cordoba",
      name: "LOGINCOR — Casa Central Córdoba",
      parentOrganization: { "@id": "https://logincor.com.ar/#organization" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. de Circunvalación Agustín Tosco 5000",
        addressLocality: "Córdoba",
        postalCode: "X5000",
        addressCountry: "AR",
      },
      telephone: "+543517000710",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "08:00",
          closes: "12:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://logincor.com.ar/#sucursal-buenos-aires",
      name: "LOGINCOR — Depósito Buenos Aires",
      parentOrganization: { "@id": "https://logincor.com.ar/#organization" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ferré 2351",
        addressLocality: "Buenos Aires",
        addressRegion: "Ciudad Autónoma de Buenos Aires",
        addressCountry: "AR",
      },
      telephone: "+541152639815",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://logincor.com.ar/#sucursal-rosario",
      name: "LOGINCOR — Depósito Rosario",
      parentOrganization: { "@id": "https://logincor.com.ar/#organization" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Río de Janeiro 2510",
        addressLocality: "Rosario",
        addressRegion: "Santa Fe",
        addressCountry: "AR",
      },
      telephone: "+543517000710",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://logincor.com.ar/#envios-24hs",
      name: "Envíos 24hs Buenos Aires a Córdoba",
      provider: { "@id": "https://logincor.com.ar/#organization" },
      description:
        "Servicio express de transporte de cargas de Buenos Aires a Córdoba con entrega garantizada en 24 horas, retiro puerta a puerta y Seguimiento Satelital en tiempo real.",
      areaServed: "Argentina",
    },
    {
      "@type": "Service",
      "@id": "https://logincor.com.ar/#logistica-industrial",
      name: "Logística Industrial",
      provider: { "@id": "https://logincor.com.ar/#organization" },
      description:
        "Soluciones integrales de logística para el sector industrial: almacenaje, distribución, gestión de inventario y descarga con Plataforma Hidráulica en domicilio.",
    },
    {
      "@type": "Service",
      "@id": "https://logincor.com.ar/#rastreo-satelital",
      name: "Rastreo Satelital de Flota",
      provider: { "@id": "https://logincor.com.ar/#organization" },
      description:
        "Tecnología GPS satelital para Seguimiento Satelital en tiempo real de cargas y vehículos. Avisos automáticos por WhatsApp y mail en cada etapa del envío.",
    },
    {
      "@type": "Service",
      "@id": "https://logincor.com.ar/#fulfillment",
      name: "Fulfillment y Almacenamiento",
      provider: { "@id": "https://logincor.com.ar/#organization" },
      description:
        "Servicio de Fulfillment para e-commerce y emprendedores: almacenamiento en depósito propio en Córdoba, control de stock, armado de pedidos y despacho directo al cliente final.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://logincor.com.ar/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuál es el mejor transporte de Buenos Aires a Córdoba?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR es la opción líder en transporte de cargas de Buenos Aires a Córdoba, con entregas garantizadas en 24 horas, Seguimiento Satelital en tiempo real y flota propia. Ofrecemos servicio puerta a puerta para particulares, e-commerce e industrias.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué empresa de transporte a Córdoba tiene la mercadería asegurada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR ofrece cobertura de seguro con pólizas de Federación Patronal. La cobertura aplica siempre y cuando se contrate el seguro al momento del envío, según los términos y condiciones de la póliza.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo descargar pallets pesados sin rampa en destino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR cuenta con 7 vehículos de gran y mediano porte equipados con Plataforma Hidráulica o pala hidráulica para descarga en domicilio. No necesitás rampa ni equipamiento especial: nuestros choferes realizan la bajada de pallets y carga voluminosa directamente en tu puerta.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo me entero que tengo un envío? ¿Cómo sé cuándo me llega y cómo me avisan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR cuenta con avisos periódicos por mail y por WhatsApp para que en todo momento tengas información de tu envío. Te avisamos cuando recibimos tu carga en el depósito de origen, cuando sale en viaje y cuando llega al centro de distribución. También te avisamos cuando sale al reparto y confirmamos la entrega por WhatsApp con los remitos y guías firmados, para tu tranquilidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo puedo ver mis envíos, mi cuenta corriente, las guías firmadas y los remitos con conformidad de entrega?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR cuenta con un sistema propio con acceso web desde donde podés ver todo tu registro: tus facturas, tus remitos firmados, tus guías y la documentación de cada entrega. También podés controlar tu cuenta corriente y gestionar nuevos envíos en cualquier momento.",
          },
        },
        {
          "@type": "Question",
          name: "¿Quién transporta cargas de particulares entre Buenos Aires y Córdoba?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LOGINCOR ofrece logística flexible para empresas y particulares con trato personalizado. Desde una caja pequeña hasta un pallet industrial, retiramos en domicilio y entregamos en destino. También brindamos servicios de Fulfillment para e-commerce y emprendedores.",
          },
        },
      ],
    },
  ],
};

// Colores de marca como constantes inline para Tailwind arbitrary values
const brand = {
  primary: "#02012B",
  secondary: "#E94E1B",
};

export default function Home() {
  return (
    <>
      <Script
        id="jsonld-logincor"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid-texture min-h-screen">
        {/* NAV */}
        <header className="border-b px-6 py-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logincor - Transporte y Logística Industrial"
                width={220}
                height={50}
                priority
              />
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
              <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
              <a href="#cobertura-mapa" className="hover:text-white transition-colors">Cobertura</a>
              <a href="#sucursales" className="hover:text-white transition-colors">Sucursales</a>
              <a
                href="https://logincor.sytes.net/logincor/ingclientes.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-white rounded-sm text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Acceso Clientes
              </a>
              <a
                href="https://logincor.sytes.net/logincor/ingclientes.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-white rounded-sm text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: brand.secondary }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Seguí tu envío
              </a>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* HERO */}
          <section className="mb-16 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: 'rgba(233,78,27,0.1)', border: '1px solid rgba(233,78,27,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse-slow" style={{ background: brand.secondary }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: brand.secondary }}>
                Flota activa · Buenos Aires — Córdoba
              </span>
            </div>
            <h1 className="font-brand text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
              LOGÍSTICA QUE
              <br />
              <span style={{ color: brand.secondary }}>NO SE DETIENE</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Transporte diario desde Buenos Aires hacia Córdoba. Envíos en 24hs para particulares, emprendimientos e industrias. Tu carga llega mañana, sin importar el tamaño.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://logincor.sytes.net/logincor/ingclientes.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Acceso Clientes
              </a>
              <a
                href="https://logincor.sytes.net/logincor/ingclientes.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: brand.secondary, border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Seguí tu envío
              </a>
            </div>
          </section>

          {/* BENTO GRID */}
          <section id="servicios" aria-label="Servicios principales">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Envíos 24hs — 2 cols */}
              <article
                className="bento-card md:col-span-2 rounded-2xl p-8 flex flex-col min-h-[280px]"
                aria-labelledby="service-24hs"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: 'rgba(233,78,27,0.2)' }}>
                  <svg className="w-6 h-6" style={{ color: brand.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 id="service-24hs" className="font-brand text-3xl font-black text-white mb-2">
                  Envíos <span style={{ color: brand.secondary }}>24hs</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-6 max-w-md">
                  Buenos Aires → Córdoba en 24hs. Retiro en puerta para e-commerce, particulares y empresas.
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <span className="px-3 py-1 rounded-full text-xs text-zinc-300 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>Buenos Aires → Córdoba</span>
                  <span className="px-3 py-1 rounded-full text-xs text-zinc-300 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>Salidas diarias</span>
                  <span className="px-3 py-1 rounded-full text-xs text-zinc-300 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>Puerta a puerta</span>
                  <span className="px-3 py-1 rounded-full text-xs text-zinc-300 font-mono" style={{ background: 'rgba(255,255,255,0.08)' }}>Carga asegurada</span>
                </div>
              </article>

              {/* Rastreo Satelital — 1 col */}
              <article
                id="rastreo"
                className="bento-card rounded-2xl p-8 flex flex-col min-h-[280px]"
                aria-labelledby="service-rastreo"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: 'rgba(233,78,27,0.2)' }}>
                  <svg className="w-6 h-6" style={{ color: brand.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 id="service-rastreo" className="font-brand text-2xl font-black text-white mb-2">
                  Rastreo <span style={{ color: brand.secondary }}>Satelital</span>
                </h2>
                <p className="text-zinc-400 flex-1">
                  GPS en tiempo real. Seguí tu carga desde el origen hasta la entrega con actualizaciones cada 5 minutos.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
                  <span className="text-xs text-green-400 font-mono">Sistema activo 24/7</span>
                </div>
              </article>

              {/* Logística Industrial — 1 col */}
              <article
                className="bento-card rounded-2xl p-8 flex flex-col min-h-[280px]"
                aria-labelledby="service-industrial"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 id="service-industrial" className="font-brand text-2xl font-black text-white mb-2">
                  Logística <span style={{ color: brand.secondary }}>Industrial</span>
                </h2>
                <p className="text-zinc-400 flex-1">
                  Cargas de todo tipo. Desde una caja pequeña hasta pallets industriales. Soluciones flexibles que se adaptan a vos.
                </p>
              </article>

              {/* Almacenamiento — 2 cols */}
              <article
                className="bento-card md:col-span-2 rounded-2xl p-8 flex flex-col min-h-[280px]"
                aria-labelledby="service-almacenamiento"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: 'rgba(233,78,27,0.2)' }}>
                  <svg className="w-6 h-6" style={{ color: brand.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h2 id="service-almacenamiento" className="font-brand text-2xl font-black text-white mb-2">
                  Almacenamiento <span style={{ color: brand.secondary }}>& Fulfillment</span>
                </h2>
                <p className="text-zinc-400 mb-5">
                  Depositá tu mercadería en nuestra Casa Central de Córdoba. Nos encargamos del resto: control de stock, armado de pedidos y despacho directo a tu cliente.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-auto">
                  {[
                    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Control de stock" },
                    { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Armado de pedidos" },
                    { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Despacho y entrega" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <svg className="w-5 h-5" style={{ color: brand.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                      </svg>
                      <span className="text-zinc-400 text-xs leading-snug">{label}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Seguro de carga — full width */}
              <article
                className="bento-card md:col-span-3 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Seguro de carga transportada Federación Patronal"
              >
                {/* Escudo / ícono */}
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl" style={{ background: 'rgba(233,78,27,0.12)', border: '1px solid rgba(233,78,27,0.25)' }}>
                  <svg className="w-10 h-10" style={{ color: brand.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                {/* Texto principal */}
                <div className="flex-1">
                  <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: brand.secondary }}>
                    Póliza de carga transportada
                  </p>
                  <h2 className="font-brand text-2xl font-black text-white mb-2">
                    Tu mercadería siempre en buenas manos
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    LOGINCOR cuenta con póliza de <span className="text-white font-semibold">carga transportada</span> con <span className="text-white font-semibold">Federación Patronal</span>, aseguradora de primera línea. Al contratar el seguro, toda tu mercadería viaja cubierta según las condiciones generales de dicha póliza. <span className="text-zinc-300">No nos autoaseguramos.</span>
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {[
                    "Federación Patronal",
                    "Sin autoaseguro",
                    "Cobertura en ruta",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 text-center"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </article>

              {/* Stats — full width */}
              <article
                id="cobertura"
                className="bento-card md:col-span-3 rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                aria-label="Estadísticas de servicio"
              >
                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                  Operaciones en números
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-4xl font-black mb-1" style={{ color: brand.secondary }}>+800km</div>
                    <div className="text-sm text-zinc-400">Corredor principal Buenos Aires-Córdoba</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-1">24hs</div>
                    <div className="text-sm text-zinc-400">Tiempo de tránsito express</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-1">98%</div>
                    <div className="text-sm text-zinc-400">Entregas en tiempo y forma</div>
                  </div>
                </div>
              </article>

              {/* CTA — full width */}
              <article
                id="contacto"
                className="bento-card md:col-span-3 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: brand.secondary }}
                aria-label="Contacto y cotización"
              >
                <div>
                  <h2 className="font-brand text-2xl font-black text-white mb-1">
                    ¿Necesitás mover una carga?
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Solicitá tu cotización en minutos. Respuesta inmediata.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    id="cta-llamar"
                    href="tel:+54351000000"
                    className="px-6 py-3 font-bold rounded-sm text-sm transition-opacity hover:opacity-90"
                    style={{ background: '#fff', color: brand.secondary }}
                  >
                    Llamar ahora
                  </a>
                  <a
                    id="cta-consulta"
                    href="mailto:cotizaciones@logincor.com.ar"
                    className="px-6 py-3 text-white font-bold rounded-sm text-sm transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(2,1,43,0.35)' }}
                  >
                    Enviar consulta
                  </a>
                </div>
              </article>

            </div>
          </section>
        </main>

        {/* COBERTURA */}
        <section id="cobertura-mapa" className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#E94E1B' }}>
              Red de distribución
            </p>
            <h2 className="font-brand text-4xl font-black text-white mb-2">Cobertura Nacional</h2>
            <p className="text-zinc-400 max-w-xl">
              Desde Córdoba llegamos a más de <span className="text-white font-semibold">1.000 localidades</span> en 22 provincias de Argentina.
            </p>
          </div>
          <div
            className="bento-card rounded-2xl p-5 md:p-8"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <ArgentinaMapWrapper />
          </div>
        </section>

        {/* SUCURSALES */}
        <section id="sucursales" className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#E94E1B' }}>
              Red de operaciones
            </p>
            <h2 className="font-brand text-4xl font-black text-white">Nuestras Sucursales</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sucursales.map((s) => (
              <article
                key={s.nombre}
                className="bento-card rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <SucursalMap address={s.address} />
                <div className="p-6 flex flex-col gap-1">
                  <span
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: '#E94E1B' }}
                  >
                    {s.ciudad}
                  </span>
                  <h3 className="font-brand text-xl font-black text-white">{s.nombre}</h3>
                  <p className="text-zinc-300 font-medium">{s.direccion}</p>
                  <p className="text-zinc-500 text-sm">{s.detalle}</p>
                  <div className="mt-3 flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#E94E1B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      {s.horarios.map((h) => (
                        <span key={h} className="text-zinc-400 text-xs">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <a href={s.telHref} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#E94E1B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {s.telefono}
                    </a>
                    <a href={`mailto:${s.mail}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#E94E1B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {s.mail}
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-opacity hover:opacity-70 mt-1"
                      style={{ color: '#E94E1B' }}
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ SGE */}
        <SGEHooks />

        {/* GALERÍA */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: '#E94E1B' }}>
              En acción
            </p>
            <h2 className="font-brand text-4xl font-black text-white">Nuestros Servicios</h2>
          </div>
          <GaleriaCarrusel />
        </section>

        <footer className="px-6 py-12 mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
            <Image
              src="/logo.svg"
              alt="Logincor - Transporte y Logística Industrial"
              width={160}
              height={36}
            />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 w-full">
              <span>© 2026 LOGINCOR · Transporte y Logística Industrial</span>
              <span className="font-mono">Buenos Aires — Córdoba · Argentina</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
