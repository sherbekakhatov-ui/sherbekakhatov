'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { X } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    category: 'views',
    aspect: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
    category: 'rooms',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop',
    category: 'vineyard',
    aspect: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    category: 'restaurant',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2070&auto=format&fit=crop',
    category: 'lavender',
    aspect: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    category: 'rooms',
    aspect: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?q=80&w=2070&auto=format&fit=crop',
    category: 'orchard',
    aspect: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    category: 'exterior',
    aspect: 'wide',
  },
];

const categories = ['all', 'exterior', 'rooms', 'restaurant', 'vineyard', 'orchard', 'lavender', 'views'] as const;

export function Gallery() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#1a3328] relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative">

        <div className="text-center mb-12">
          <span className={cn(
            'inline-block text-[#d4af37] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] font-medium mb-4 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.gallery.subtitle}
          </span>
          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] font-medium mb-6 transition-all duration-700 delay-100',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            {t.gallery.title}
          </h2>
          <div className={cn(
            'flex items-center justify-center gap-4 transition-all duration-700 delay-200',
            isInView ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="w-16 h-px bg-[#d4af37]" />
            <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
            <div className="w-16 h-px bg-[#d4af37]" />
          </div>
        </div>

        <div className={cn(
          'flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-300',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-2 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] font-medium rounded-sm transition-all duration-300',
                activeCategory === category
                  ? 'bg-[#d4af37] text-[#1a3328]'
                  : 'border border-[#f5f0e8]/30 text-[#f5f0e8]/70 hover:border-[#d4af37]/50 hover:text-[#f5f0e8]'
              )}
            >
              {t.gallery.categories[category]}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                'group relative break-inside-avoid overflow-hidden rounded-sm cursor-pointer transition-all duration-500',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                image.aspect === 'tall' && 'aspect-[3/4]',
                image.aspect === 'wide' && 'aspect-[4/3]',
                image.aspect === 'square' && 'aspect-square'
              )}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={`Miraki Gardens – ${t.gallery.categories[image.category as typeof categories[number]]}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading={index < 3 ? 'eager' : 'lazy'}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#1a3328]/0 group-hover:bg-[#1a3328]/40 transition-all duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-[#f5f0e8] flex items-center justify-center">
                  <div className="w-6 h-px bg-[#f5f0e8]" />
                  <div className="w-px h-6 bg-[#f5f0e8] absolute" />
                </div>
              </div>

              <div className="absolute inset-3 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-500 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1a3328]/95 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#f5f0e8] hover:text-[#d4af37] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Miraki Gardens galereya"
              width={1400}
              height={900}
              className="object-contain rounded-sm max-h-[90vh] w-auto mx-auto"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
