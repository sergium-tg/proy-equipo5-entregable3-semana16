Ëimport ServicesHero from '@/components/services/ServicesHero'
import CoreAdvisory from '@/components/services/CoreAdvisory'
import DetailedServices from '@/components/services/DetailedServices'
import ValuedAudits from '@/components/services/ValuedAudits'
import CTA from '@/components/sections/CTA'
import Benefits from '@/components/sections/Benefits'

export const metadata = {
    title: 'Nuestros Servicios | SIPRAC - PrevenciÃ³n de Riesgos',
    description: 'Conozca en detalle nuestro portafolio de servicios en SST, GestiÃ³n Ambiental, Calidad ISO 9001 y AuditorÃ­as Integrales.',
}

const ServicesPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ServicesHero />
            <CoreAdvisory />
            <DetailedServices />
            <ValuedAudits />
            <Benefits />
            <div className="bg-[#FAF9F6]">
                <CTA />
            </div>
        </div>
    )
}

export default ServicesPage
Ë"(b80abb75684d6dc31d813f8591342fb8ad2a41b22kfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/app/services/page.tsx:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac