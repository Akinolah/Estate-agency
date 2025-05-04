
// src/components/services-page-components/core-services-grid.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Handshake, Search, Network, Wrench, Home } from 'lucide-react';

export function CoreServicesGrid() {
    return (
        <section id="core-services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Handshake className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Buyer Representation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Expert guidance through the entire home buying process, from search to closing.
                            We negotiate on your behalf to secure the best deal.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Home className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Seller Representation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Strategic marketing and pricing for your property. We manage showings, offers,
                            and negotiations to achieve a successful sale.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Search className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Advanced Property Search</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Utilize our powerful platform with detailed filters, map search, and saved search
                            notifications to find properties easily.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Network className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Market Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Stay informed with comprehensive market reports, neighborhood insights, and property
                            valuation estimates.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Wrench className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Resource Connections</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Access our network of trusted professionals, including mortgage lenders, inspectors,
                            and contractors.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
