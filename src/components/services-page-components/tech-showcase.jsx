
// src/components/services-page-components/tech-showcase.jsx
import { InteractiveMapSection } from '@/components/interactive-map-section';
import { MortgageCalculatorSection } from '@/components/mortgage-calculator-section';
import { VirtualToursSection } from '@/components/virtual-tours-section';
import { GalleryRoom } from '@/components/gallery-room';


export function TechShowcase({ sampleProperties }) {
    return (
        <section id="tech-showcase" className="space-y-16 md:space-y-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Leveraging Technology for You</h2>

            <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
                <h3 className="text-2xl font-semibold mb-4">Explore with Virtual Tours</h3>
                <p className="text-muted-foreground mb-6">Step inside properties anytime, anywhere with our immersive virtual tours.</p>
                <VirtualToursSection properties={sampleProperties.filter(p => p.virtualTourUrl)} />
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
                <h3 className="text-2xl font-semibold mb-4">Visualize Property Galleries</h3>
                <p className="text-muted-foreground mb-6">See properties in detail through curated image galleries.</p>
                <GalleryRoom properties={sampleProperties.filter(p => p.galleryImages && p.galleryImages.length > 0)} />
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
                <h3 className="text-2xl font-semibold mb-4">Interactive Map Search</h3>
                <p className="text-muted-foreground mb-6">Discover properties based on location and explore neighborhoods visually.</p>
                <InteractiveMapSection properties={sampleProperties} />
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
                <h3 className="text-2xl font-semibold mb-4">Estimate Your Mortgage</h3>
                <p className="text-muted-foreground mb-6">Plan your finances with our easy-to-use mortgage calculator.</p>
                <MortgageCalculatorSection />
            </div>
        </section>
    );
}
