'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, maximize, Home } from 'lucide-react';
import type { Property } from '@/types/property';
import { PropertyCard } from './property-card';

interface PropertyListingsProps {
  initialProperties: Property[];
}

export function PropertyListings({ initialProperties }: PropertyListingsProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 1000000]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [bedroomsFilter, setBedroomsFilter] = useState('All');
  const [bathroomsFilter, setBathroomsFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');

  const propertyTypes = useMemo(() => ['All', ...new Set(initialProperties.map(p => p.type))], [initialProperties]);
  const bedroomOptions = useMemo(() => ['All', ...Array.from(new Set(initialProperties.map(p => p.bedrooms.toString()))).sort((a,b) => parseInt(a) - parseInt(b))], [initialProperties]);
  const bathroomOptions = useMemo(() => ['All', ...Array.from(new Set(initialProperties.map(p => p.bathrooms.toString()))).sort((a,b) => parseInt(a) - parseInt(b))], [initialProperties]);

  const maxPrice = useMemo(() => Math.max(...initialProperties.map(p => p.price), 1000000), [initialProperties]);


  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (locationFilter) {
      filtered = filtered.filter(p => p.address.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    filtered = filtered.filter(p => p.price >= priceRangeFilter[0] && p.price <= priceRangeFilter[1]);

    if (typeFilter !== 'All') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    if (bedroomsFilter !== 'All') {
      filtered = filtered.filter(p => p.bedrooms === parseInt(bedroomsFilter));
    }

     if (bathroomsFilter !== 'All') {
      filtered = filtered.filter(p => p.bathrooms === parseInt(bathroomsFilter));
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms-asc':
         filtered.sort((a, b) => a.bedrooms - b.bedrooms);
        break;
      case 'bedrooms-desc':
         filtered.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
       case 'area-asc':
         filtered.sort((a, b) => (a.area ?? 0) - (b.area ?? 0));
        break;
      case 'area-desc':
         filtered.sort((a, b) => (b.area ?? 0) - (a.area ?? 0));
        break;
    }


    return filtered;
  }, [properties, locationFilter, priceRangeFilter, typeFilter, bedroomsFilter, bathroomsFilter, sortBy]);

  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Property Listings</h2>

      {/* Filters */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle>Filter & Sort Properties</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Location Filter */}
          <div className="space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter city, address, zip..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          {/* Price Range Filter */}
           <div className="space-y-1 col-span-1 sm:col-span-2 lg:col-span-1">
            <Label>Price Range</Label>
             <Slider
              min={0}
              max={maxPrice}
              step={10000}
              value={priceRangeFilter}
              onValueChange={(value) => setPriceRangeFilter(value as [number, number])}
              className="py-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRangeFilter[0].toLocaleString()}</span>
              <span>${priceRangeFilter[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Property Type Filter */}
          <div className="space-y-1">
            <Label htmlFor="type">Property Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms Filter */}
          <div className="space-y-1">
            <Label htmlFor="bedrooms">Bedrooms</Label>
             <Select value={bedroomsFilter} onValueChange={setBedroomsFilter}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                 {bedroomOptions.map(beds => (
                  <SelectItem key={beds} value={beds}>{beds}{beds !== 'All' ? '+' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms Filter */}
          <div className="space-y-1">
            <Label htmlFor="bathrooms">Bathrooms</Label>
             <Select value={bathroomsFilter} onValueChange={setBathroomsFilter}>
              <SelectTrigger id="bathrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                 {bathroomOptions.map(baths => (
                  <SelectItem key={baths} value={baths}>{baths}{baths !== 'All' ? '+' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

           {/* Sort By */}
          <div className="space-y-1">
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="bedrooms-asc">Bedrooms: Low to High</SelectItem>
                <SelectItem value="bedrooms-desc">Bedrooms: High to Low</SelectItem>
                <SelectItem value="area-asc">Area: Low to High</SelectItem>
                <SelectItem value="area-desc">Area: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardContent>
         <CardFooter>
          <Button onClick={() => { /* Optionally clear filters */
            setLocationFilter('');
            setPriceRangeFilter([0, maxPrice]);
            setTypeFilter('All');
            setBedroomsFilter('All');
            setBathroomsFilter('All');
            setSortBy('price-asc');
          }} variant="outline">Clear Filters</Button>
        </CardFooter>
      </Card>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProperties.map(property => (
             <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-12">No properties match your current filters.</p>
      )}

       {/* TODO: Add Pagination if needed */}

    </div>
  );
}
