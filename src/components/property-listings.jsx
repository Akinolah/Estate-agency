
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
// Removed type import
import { PropertyCard } from './property-card';
import { useCurrency } from '@/hooks/useCurrency'; // Import currency hook

// Removed interface

// Example Nigerian states and common property types
const nigerianStates = ['All', 'Lagos', 'FCT', 'Rivers', 'Ogun', 'Oyo', 'Kano', 'Kaduna']; // Add more as needed
const propertyTypesNG = ['All', 'Detached Duplex', 'Semi-Detached Duplex', 'Terraced House', 'Flat/Apartment', 'Bungalow', 'Maisonette', 'Penthouse', 'Land'];

export function PropertyListings({ initialProperties }) { // Removed type
  const [properties, setProperties] = useState(initialProperties); // Removed type
  const [locationFilter, setLocationFilter] = useState(''); // Can filter by address, city, state, lga
  const [stateFilter, setStateFilter] = useState('All');
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 2000000]); // Removed type, Default price range in USD (base currency)
  const [typeFilter, setTypeFilter] = useState('All');
  const [bedroomsFilter, setBedroomsFilter] = useState('All');
  const [bathroomsFilter, setBathroomsFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');

  const { formatPrice, selectedCurrency } = useCurrency(); // Use currency hook

  // Derive options from initial properties or use predefined lists
  const bedroomOptions = useMemo(() => ['All', ...Array.from(new Set(initialProperties.map(p => p.bedrooms.toString()))).sort((a, b) => parseInt(a) - parseInt(b))], [initialProperties]);
  const bathroomOptions = useMemo(() => ['All', ...Array.from(new Set(initialProperties.map(p => p.bathrooms.toString()))).sort((a, b) => parseInt(a) - parseInt(b))], [initialProperties]);

  const maxPrice = useMemo(() => Math.max(...initialProperties.map(p => p.price), 2000000), [initialProperties]);


  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Location filter (checks address, city, lga)
    if (locationFilter) {
      const lowerLocation = locationFilter.toLowerCase();
      filtered = filtered.filter(p =>
        p.address.toLowerCase().includes(lowerLocation) ||
        p.city.toLowerCase().includes(lowerLocation) ||
        (p.lga && p.lga.toLowerCase().includes(lowerLocation))
      );
    }

     // State filter
    if (stateFilter !== 'All') {
      filtered = filtered.filter(p => p.state === stateFilter);
    }

    // Price range filter (applied on the base currency price)
    filtered = filtered.filter(p => p.price >= priceRangeFilter[0] && p.price <= priceRangeFilter[1]);

    // Type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Bedrooms filter
    if (bedroomsFilter !== 'All') {
        const minBeds = parseInt(bedroomsFilter);
         filtered = filtered.filter(p => p.bedrooms >= minBeds); // Show properties with this many beds or more
    }

    // Bathrooms filter
     if (bathroomsFilter !== 'All') {
        const minBaths = parseInt(bathroomsFilter);
        filtered = filtered.filter(p => p.bathrooms >= minBaths); // Show properties with this many baths or more
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
       // Add sorting by date added (if available)
       // case 'date-newest':
       //   filtered.sort((a, b) => (b.dateAdded ?? 0) - (a.dateAdded ?? 0));
       //   break;
       // case 'date-oldest':
       //   filtered.sort((a, b) => (a.dateAdded ?? 0) - (b.dateAdded ?? 0));
       //   break;
    }


    return filtered;
  }, [properties, locationFilter, stateFilter, priceRangeFilter, typeFilter, bedroomsFilter, bathroomsFilter, sortBy]);

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
          {/* Location Keyword Filter */}
          <div className="space-y-1">
            <Label htmlFor="location">Keyword (Address, City, LGA)</Label>
            <Input
              id="location"
              placeholder="e.g., Lekki, Wuse 2, Plot 10..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

           {/* State Filter */}
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          {/* Price Range Filter */}
           <div className="space-y-1 col-span-1 sm:col-span-2 lg:col-span-1">
            <Label>Price Range ({selectedCurrency})</Label>
             <Slider
              min={0}
              max={maxPrice} // Max price in base currency (USD)
              step={10000} // Step in base currency
              value={priceRangeFilter} // Value in base currency
              onValueChange={(value) => setPriceRangeFilter(value)} // Removed type assertion
              className="py-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatPrice(priceRangeFilter[0])}</span>
              <span>{formatPrice(priceRangeFilter[1])}</span>
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
                {propertyTypesNG.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms Filter */}
          <div className="space-y-1">
            <Label htmlFor="bedrooms">Min. Bedrooms</Label>
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
            <Label htmlFor="bathrooms">Min. Bathrooms</Label>
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
                <SelectItem value="bedrooms-desc">Bedrooms: High to Low</SelectItem>
                 <SelectItem value="bedrooms-asc">Bedrooms: Low to High</SelectItem>
                <SelectItem value="area-desc">Area: High to Low</SelectItem>
                <SelectItem value="area-asc">Area: Low to High</SelectItem>
                 {/* Add Date sorting options if available */}
                 {/* <SelectItem value="date-newest">Date Added: Newest</SelectItem> */}
                 {/* <SelectItem value="date-oldest">Date Added: Oldest</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

        </CardContent>
         <CardFooter>
          <Button onClick={() => {
            setLocationFilter('');
            setStateFilter('All');
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
