export interface Project {
  id: string;
  title: string;
  category: string;
  views: string;
  videoUrl: string;
  thumbnailUrl: string;
  size: "small" | "medium" | "large" | "wide";
  // Extended fields for project detail pages
  description?: string;
  client?: string;
  role?: string;
  timeline?: string;
  format?: string;
  tools?: string;
  outcome?: string;
  process?: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "football-academy",
    title: "Football Plus Academy",
    category: "Sports Videography",
    views: "1.4M VIEWS",
    videoUrl: "/videos/football/clip-1.mp4",
    thumbnailUrl: "/images/hero/showreel.jpg",
    size: "large",
    description: "Captured the raw energy and passion of Football Plus Academy. High-frame-rate tracking shots and sports-sync editing transformed raw footage into a viral sensation.",
    client: "Football Plus Academy",
    role: "Lead Videographer & Editor",
    timeline: "4 Weeks",
    format: "16:9 + 9:16 Vertical",
    tools: "Premiere Pro, After Effects, DaVinci Resolve",
    outcome: "Generated over 1.4M organic views and increased academy enrollment by 200%.",
    process: [
      { step: "01", title: "Pre-Production", desc: "Scouted locations, planned shot lists, and choreographed key moments with the coaching staff." },
      { step: "02", title: "Production", desc: "4K 60fps cinematography using Sony A7SIII and DJI Ronin for buttery smooth tracking shots." },
      { step: "03", title: "Post-Production", desc: "Precision editing with beat-synced cuts, custom sound design, and viral-ready color grading." },
    ],
  },
  {
    id: "yoga-astrology",
    title: "Vasi Yoga Astrology",
    category: "Viral Reels",
    views: "1M VIEWS",
    videoUrl: "/videos/reels/reel-6.mp4",
    thumbnailUrl: "/images/on-location/harbour-shooting.jpg",
    size: "medium",
    description: "Created a series of vertical reels for Vasi Yoga Astrology that fused spiritual content with trending audio and rapid-fire editing to capture a massive audience.",
    client: "Vasi Yoga Astrology",
    role: "Editor & Motion Designer",
    timeline: "2 Weeks",
    format: "9:16 Vertical",
    tools: "Premiere Pro, After Effects",
    outcome: "Crossed 1M views organically, establishing the brand's social media presence from scratch.",
    process: [
      { step: "01", title: "Content Strategy", desc: "Analyzed trending audio and formats on Instagram to craft scroll-stopping hooks." },
      { step: "02", title: "Visual Design", desc: "Created custom typography, kinetic text animations, and spiritual visual motifs." },
      { step: "03", title: "Optimization", desc: "A/B tested thumbnails, captions, and posting times for maximum reach." },
    ],
  },
  {
    id: "brazil-legends",
    title: "Brazil Legends Event",
    category: "Event Coverage",
    views: "PREMIUM",
    videoUrl: "/videos/football/clip-2.mp4",
    thumbnailUrl: "/images/timeline/stadium-pass.jpg",
    size: "medium",
    description: "Full event coverage of the Brazil Legends exhibition match in Chennai. Multi-camera setup capturing every goal, celebration, and behind-the-scenes moment.",
    client: "Brazil Legends Chennai",
    role: "Lead Videographer",
    timeline: "1 Week",
    format: "16:9 Cinematic",
    tools: "Premiere Pro, DaVinci Resolve",
    outcome: "Delivered premium event film that became the official highlight reel for the organizers.",
    process: [
      { step: "01", title: "Planning", desc: "Coordinated multi-camera positions, identified key moments, and planned crowd coverage." },
      { step: "02", title: "Live Capture", desc: "120fps slow-motion for goals and celebrations, wide angles for atmosphere." },
      { step: "03", title: "Turnaround", desc: "48-hour edit turnaround with cinematic color grade and stadium-quality sound mix." },
    ],
  },
  {
    id: "cake-square",
    title: "Cake Square Ad",
    category: "Product Promo",
    views: "120K VIEWS",
    videoUrl: "/videos/reels/reel-7.mp4",
    thumbnailUrl: "/images/clients/cake-square.png",
    size: "small",
    description: "Mouth-watering product promo for Cake Square featuring close-up macro shots, smooth reveals, and appetite-triggering color grading.",
    client: "Cake Square",
    role: "Videographer & Editor",
    timeline: "1 Week",
    format: "1:1 + 9:16",
    tools: "Premiere Pro, Photoshop",
    outcome: "120K views with a 15% increase in online orders during the campaign period.",
  },
  {
    id: "wonkrew-legacy",
    title: "Wonkrew Collaboration",
    category: "Agency Work",
    views: "180 VIDEOS",
    videoUrl: "/videos/football/clip-3.mp4",
    thumbnailUrl: "/images/clients/wonkrew.png",
    size: "wide",
    description: "Long-term collaboration with Wonkrew digital marketing agency. Delivered 180+ videos across multiple brands, formats, and platforms.",
    client: "Wonkrew Digital Agency",
    role: "Freelance Editor",
    timeline: "Ongoing (12+ Months)",
    format: "Multi-format",
    tools: "Premiere Pro, After Effects, Canva",
    outcome: "Delivered 180+ videos with consistent quality, becoming the go-to editor for the agency.",
  },
  {
    id: "sanguine-blue",
    title: "Sanguine Blue Brand",
    category: "Commercial",
    views: "120+ DELIVERED",
    videoUrl: "/videos/reels/reel-8.mp4",
    thumbnailUrl: "/images/clients/sbbs.png",
    size: "medium",
    description: "Full brand video production for Sanguine Blue — from concept to delivery. Created a cohesive visual identity across all video content.",
    client: "Sanguine Blue",
    role: "Creative Director & Editor",
    timeline: "6 Weeks",
    format: "16:9 + 9:16",
    tools: "Premiere Pro, After Effects, Illustrator",
    outcome: "Established a complete video identity with 120+ deliverables across social platforms.",
  },
  {
    id: "vertical-reels-1",
    title: "Fitness Motivation",
    category: "Viral Vertical",
    views: "850K VIEWS",
    videoUrl: "/videos/football/clip-4.mp4",
    thumbnailUrl: "/images/on-location/stadium-shooting.jpg",
    size: "medium",
    description: "High-energy fitness motivation reels using rapid cuts, bass-synced transitions, and dynamic text overlays to capture the gym audience.",
    client: "Fitness Influencer",
    role: "Editor & Motion Designer",
    timeline: "3 Days",
    format: "9:16 Vertical",
    tools: "Premiere Pro, After Effects",
    outcome: "850K views, featured on Instagram Explore page.",
  },
];
