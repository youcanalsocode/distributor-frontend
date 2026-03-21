import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

interface CarouselSlide {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  btnLabel: string;
  btnAction: 'products' | 'feedback' | 'delivery' | 'brands';
  btnStyle: 'primary' | 'outline';
}

interface BrandLogo {
  name: string;
  abbr: string;
  color: string;
}

interface Testimonial {
  restaurant: string;
  owner: string;
  city: string;
  message: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styles: [
    `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .fade-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      /* ── Carousel ─────────────────────────────────────────────────────────── */
      .carousel-slide {
        position: relative;
        width: 100%;
        height: clamp(240px, 55vw, 520px);
        overflow: hidden;
      }
      .carousel-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.7s ease;
      }
      .carousel-slide:hover img {
        transform: scale(1.04);
      }

      .carousel-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.75) 0%,
          rgba(0, 0, 0, 0.25) 50%,
          rgba(0, 0, 0, 0.05) 100%
        );
      }

      .carousel-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: clamp(1rem, 4vw, 2.5rem);
        color: white;
      }

      /* ── Buttons ──────────────────────────────────────────────────────────── */
      .slide-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        background: linear-gradient(135deg, #0d9488, #2563eb);
        color: white;
        padding: 0.6rem 1.4rem;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(13, 148, 136, 0.35);
        transition: all 0.22s ease;
      }
      .slide-btn-primary:hover {
        transform: translateX(3px);
        box-shadow: 0 6px 22px rgba(13, 148, 136, 0.5);
      }
      .slide-btn-primary:hover .btn-arrow {
        transform: translateX(3px);
      }
      .btn-arrow {
        transition: transform 0.22s ease;
      }

      .slide-btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        background: transparent;
        color: white;
        padding: 0.55rem 1.4rem;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 0.875rem;
        border: 2px solid rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.22s ease;
      }
      .slide-btn-outline:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: white;
      }

      .arrow-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #0d9488, #2563eb);
        color: white;
        padding: 0.875rem 2rem;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(13, 148, 136, 0.35);
        transition: all 0.25s ease;
      }
      .arrow-btn:hover {
        transform: translateX(4px);
        box-shadow: 0 6px 28px rgba(13, 148, 136, 0.5);
      }
      .arrow-btn:hover svg {
        transform: translateX(4px);
      }
      .arrow-btn svg {
        transition: transform 0.25s ease;
      }

      /* ── Cards ────────────────────────────────────────────────────────────── */
      .delivery-card {
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }
      .delivery-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
      }

      .logo-pill {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 0.65rem 1rem;
        font-weight: 600;
        font-size: 0.85rem;
        color: #1f2937;
        transition: all 0.2s ease;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      }
      .logo-pill:hover {
        border-color: #0d9488;
        box-shadow: 0 4px 14px rgba(13, 148, 136, 0.15);
        transform: translateY(-2px);
      }

      .testimonial-card {
        min-width: 280px;
        max-width: 300px;
        flex-shrink: 0;
        background: white;
        border-radius: 20px;
        padding: 1.25rem;
        border: 1px solid #f1f5f9;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }
      .testimonial-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
      }

      .stars {
        color: #f59e0b;
      }

      ::-webkit-scrollbar {
        height: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }
    `,
  ],
})
export class HomeComponent {
  private readonly router = inject(Router);

  // ── Section 1: Static Carousel Slides ─────────────────────────────────────
  carouselSlides: CarouselSlide[] = [
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=520&fit=crop',
      tag: 'Fresh Produce',
      title: 'Farm-Fresh Vegetables,\nDelivered Before Dawn',
      subtitle:
        'Bulk sourcing from certified farms — consistent quality, fair pricing, every morning.',
      btnLabel: 'Explore Products',
      btnAction: 'products',
      btnStyle: 'primary',
    },
    {
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=520&fit=crop',
      tag: 'Premium Meats',
      title: 'Restaurant-Grade Meats,\nCold-Chain Assured',
      subtitle: 'Temperature-controlled from farm to kitchen. FSSAI-certified, audit-ready.',
      btnLabel: 'Shop Meats',
      btnAction: 'products',
      btnStyle: 'primary',
    },
    {
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=520&fit=crop',
      tag: 'Dairy & Pantry',
      title: 'Everything Your Kitchen\nNeeds in One Order',
      subtitle: 'Dairy, dry goods, spices, oils — one partner, one invoice, zero hassle.',
      btnLabel: 'See All Products',
      btnAction: 'products',
      btnStyle: 'primary',
    },
    {
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=520&fit=crop',
      tag: 'Trusted by Restaurants',
      title: '200+ Restaurants Trust\nVimek Restomart',
      subtitle: 'From cloud kitchens to fine dining — see what our partners have to say.',
      btnLabel: 'Read Reviews',
      btnAction: 'feedback',
      btnStyle: 'outline',
    },
    {
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1400&h=520&fit=crop',
      tag: 'Reliable Delivery',
      title: 'Next-Day Delivery,\n98% On-Time Rate',
      subtitle: 'Order by midnight, receive by 6 AM. Zero surprises, zero shortages.',
      btnLabel: 'How We Deliver',
      btnAction: 'delivery',
      btnStyle: 'outline',
    },
  ];

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 1, numScroll: 1 },
    { breakpoint: '992px', numVisible: 1, numScroll: 1 },
    { breakpoint: '576px', numVisible: 1, numScroll: 1 },
  ];

  // ── Section 3: Delivery Features ──────────────────────────────────────────
  deliveryFeatures = [
    {
      icon: '🚚',
      title: 'Next-Day Delivery',
      desc: 'Order by midnight, get it by 6 AM — before your kitchen fires up.',
      highlight: 'Delivered by 6 AM',
    },
    {
      icon: '❄️',
      title: 'Cold-Chain Assured',
      desc: 'Temperature-controlled vehicles from farm to your kitchen door.',
      highlight: '2–8°C Maintained',
    },
    {
      icon: '📦',
      title: 'Bulk, Restaurant-Grade',
      desc: 'Commercial quantities, no retail markup, no waste.',
      highlight: 'Up to 30% Savings',
    },
    {
      icon: '✅',
      title: 'FSSAI Certified',
      desc: 'Every product passes rigorous quality checks with full traceability.',
      highlight: 'Audit-Ready',
    },
    {
      icon: '📞',
      title: 'Dedicated Manager',
      desc: 'A single point of contact for orders, issues, and custom requirements.',
      highlight: '24×7 Support',
    },
    {
      icon: '🔄',
      title: 'Flexible Scheduling',
      desc: 'Weekly, bi-weekly or custom delivery schedules to match your rhythm.',
      highlight: 'Your Schedule',
    },
  ];

  // ── Section 4: Brand & Restaurant Logos ───────────────────────────────────
  sourcingBrands: BrandLogo[] = [
    { name: 'Amul Dairies', abbr: 'AM', color: '#dc2626' },
    { name: 'Mother Dairy', abbr: 'MD', color: '#16a34a' },
    { name: 'ITC Agri', abbr: 'IT', color: '#7c3aed' },
    { name: 'Suguna Foods', abbr: 'SG', color: '#ea580c' },
    { name: 'Fresh & Pure Farms', abbr: 'FP', color: '#0891b2' },
    { name: 'Jain Irrigation', abbr: 'JI', color: '#d97706' },
    { name: 'Himalayan Organic', abbr: 'HO', color: '#059669' },
    { name: 'NaturalFarm Co.', abbr: 'NF', color: '#be185d' },
  ];

  trustedRestaurants: BrandLogo[] = [
    { name: 'Bukhara, ITC', abbr: 'BK', color: '#b45309' },
    { name: 'Mainland China', abbr: 'MC', color: '#dc2626' },
    { name: 'Punjab Grill', abbr: 'PG', color: '#15803d' },
    { name: 'Theobroma', abbr: 'TB', color: '#92400e' },
    { name: 'Social (Impresario)', abbr: 'SC', color: '#6d28d9' },
    { name: 'Barbeque Nation', abbr: 'BN', color: '#c2410c' },
    { name: 'Farzi Café', abbr: 'FC', color: '#0f766e' },
    { name: 'The Beer Café', abbr: 'BC', color: '#1d4ed8' },
  ];

  // ── Section 5: Owner Message + Testimonials ────────────────────────────────
  ownerMessage = {
    name: 'Vivek Maurya',
    title: 'Founder & CEO, Vimek Restomart',
    message: `"We built Vimek Restomart because we've seen first-hand how much time restaurant owners lose chasing multiple vendors, dealing with inconsistent quality, and managing last-minute shortages. Our promise is simple — you focus on cooking great food, and we handle everything before it reaches your kitchen. Every morning, fresh. Every time, reliable."`,
    initials: 'VS',
    experience: '18+ Years in F&B Supply Chain',
  };

  testimonials: Testimonial[] = [
    {
      restaurant: 'Spice Garden Restaurant',
      owner: 'Chef Rakesh Mehra',
      city: 'Mumbai',
      message:
        "Since switching to Vimek, our vegetable costs dropped by 22% and we've had zero shortages in 8 months. The cold-chain quality is unmatched.",
      rating: 5,
      initials: 'RM',
      avatarColor: '#0d9488',
    },
    {
      restaurant: 'The Urban Kitchen',
      owner: 'Priya Nair',
      city: 'Bangalore',
      message:
        'Our dedicated account manager knows our menu by heart. When we launched a new seasonal menu, they had the produce ready two days before we even asked!',
      rating: 5,
      initials: 'PN',
      avatarColor: '#7c3aed',
    },
    {
      restaurant: 'Coastline Seafood Café',
      owner: 'Anand Pillai',
      city: 'Kochi',
      message:
        'Fresh seafood at 5 AM, every single day. Our guests can taste the difference. Vimek is the silent partner behind our TripAdvisor #1 ranking.',
      rating: 5,
      initials: 'AP',
      avatarColor: '#0369a1',
    },
    {
      restaurant: 'Tandoor & Tales',
      owner: 'Gurpreet Singh',
      city: 'Delhi',
      message:
        'Switched from 7 different vendors to just Vimek. Procurement time halved, invoice reconciliation is simple, and quality is consistently top-notch.',
      rating: 5,
      initials: 'GS',
      avatarColor: '#b45309',
    },
    {
      restaurant: 'Patio Bistro',
      owner: 'Sneha Kulkarni',
      city: 'Pune',
      message:
        'The flexible delivery scheduling is a game-changer. We customized our slots around our prep schedule and now the kitchen runs like clockwork.',
      rating: 5,
      initials: 'SK',
      avatarColor: '#be185d',
    },
  ];

  handleSlideAction(action: CarouselSlide['btnAction']): void {
    switch (action) {
      case 'products':
        this.router.navigate(['/products']);
        break;
      case 'feedback':
        document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'delivery':
        document.getElementById('delivery-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'brands':
        document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
