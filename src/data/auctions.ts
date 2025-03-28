
export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  views: number;
  likes: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  endTime: Date;
  status: 'active' | 'ending-soon' | 'ended';
}

export const auctions: Auction[] = [
  {
    id: '1',
    title: 'Vintage Mechanical Watch',
    description: 'A rare vintage mechanical watch from the 1960s in excellent condition.',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
    currentBid: 450,
    startingBid: 200,
    bidCount: 12,
    views: 243,
    likes: 57,
    seller: {
      id: 's1',
      name: 'WatchCollector',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    status: 'active'
  },
  {
    id: '2',
    title: 'Original Artwork: "Abstract Sunset"',
    description: 'Original acrylic painting on canvas, signed by the artist.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    currentBid: 1250,
    startingBid: 800,
    bidCount: 8,
    views: 189,
    likes: 42,
    seller: {
      id: 's2',
      name: 'ArtGallery',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 3), // 3 hours from now
    status: 'ending-soon'
  },
  {
    id: '3',
    title: 'Gaming PC - High Performance Build',
    description: 'Custom-built gaming PC with RTX 3080, 32GB RAM, and 1TB SSD.',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7',
    currentBid: 1800,
    startingBid: 1500,
    bidCount: 5,
    views: 312,
    likes: 29,
    seller: {
      id: 's3',
      name: 'TechDeals',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    status: 'active'
  },
  {
    id: '4',
    title: 'Antique Wooden Furniture Set',
    description: 'Beautiful handcrafted wooden furniture set from the early 1900s.',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
    currentBid: 3200,
    startingBid: 2000,
    bidCount: 15,
    views: 278,
    likes: 64,
    seller: {
      id: 's4',
      name: 'VintageFinds',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    status: 'ending-soon'
  },
  {
    id: '5',
    title: 'Limited Edition Sneakers',
    description: 'Rare limited edition sneakers, never worn, with original box.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    currentBid: 750,
    startingBid: 500,
    bidCount: 9,
    views: 421,
    likes: 87,
    seller: {
      id: 's5',
      name: 'SneakerHead',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    status: 'active'
  },
  {
    id: '6',
    title: 'Luxury Designer Handbag',
    description: 'Authentic designer handbag from latest collection, includes certification.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    currentBid: 2250,
    startingBid: 1800,
    bidCount: 7,
    views: 198,
    likes: 53,
    seller: {
      id: 's6',
      name: 'LuxuryReseller',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    endTime: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
    status: 'ending-soon'
  }
];
