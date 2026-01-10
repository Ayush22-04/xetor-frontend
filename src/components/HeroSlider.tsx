import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface HeroImage {
  id: number;
  hero_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const HeroSlider = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await fetch( `${import.meta.env.VITE_API_BASE_URL}/api/home/`);
        if (!response.ok) {
          throw new Error('Failed to fetch hero images');
        }
        const data = await response.json();
        setHeroImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching hero images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroImages();
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-full">
      {/* Slider */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {isLoading ? (
            <div className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          ) : error ? (
            <div className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center text-red-500">
              Error loading images: {error}
            </div>
          ) : heroImages.length > 0 ? (
            heroImages.map((image) => (
              <div
                key={image.id}
                className="flex-[0_0_100%] min-w-0 relative h-full"
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${image.hero_image}`}
                  alt={`Hero ${image.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/50" />
              </div>
            ))
          ) : (
            <div className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center">
              No hero images available
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {!isLoading && !error && heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-accent w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
