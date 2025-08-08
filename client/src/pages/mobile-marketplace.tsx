import { useState } from 'react';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Search,
  Filter,
  Star,
  Shield,
  Verified,
  Crown,
  Flame,
  Zap,
  TrendingUp
} from 'lucide-react';

const categories = [
  { name: 'Skins', icon: '🎨', count: '2.3K', trending: true },
  { name: 'Accounts', icon: '👤', count: '890', trending: false },
  { name: 'Coaching', icon: '🎯', count: '156', trending: true },
  { name: 'Boosting', icon: '🚀', count: '234', trending: false }
];

const listings = [
  {
    id: '1',
    type: 'skin',
    title: 'Valorant Prime Vandal',
    game: 'Valorant',
    price: '₹4,999',
    originalPrice: '₹6,500',
    seller: { name: 'SkinMaster_Pro', rating: 4.9, verified: true, sales: 1247 },
    image: '🔫',
    condition: 'Mint',
    rarity: 'Legendary',
    trending: true,
    trustBadges: ['verified', 'top_seller', 'fast_delivery']
  },
  {
    id: '2',
    type: 'account',
    title: 'Immortal Rank Account',
    game: 'Valorant', 
    price: '₹12,000',
    originalPrice: null,
    seller: { name: 'RankBoost_King', rating: 4.7, verified: true, sales: 567 },
    image: '💎',
    condition: 'Fresh',
    rarity: 'Rare',
    trending: false,
    trustBadges: ['verified', 'rank_specialist']
  },
  {
    id: '3',
    type: 'coaching',
    title: '1-on-1 Pro Coaching',
    game: 'CS:GO',
    price: '₹2,500',
    originalPrice: '₹3,000',
    seller: { name: 'Coach_Sensei', rating: 5.0, verified: true, sales: 234 },
    image: '🎯',
    condition: 'Live Session',
    rarity: 'Premium',
    trending: true,
    trustBadges: ['verified', 'pro_player', 'money_back']
  },
  {
    id: '4',
    type: 'service',
    title: 'BGMI UC Top-up',
    game: 'BGMI',
    price: '₹799',
    originalPrice: '₹999',
    seller: { name: 'UC_Express', rating: 4.8, verified: true, sales: 2134 },
    image: '💰',
    condition: 'Instant',
    rarity: 'Common',
    trending: false,
    trustBadges: ['verified', 'instant_delivery']
  }
];

const trustBadgeIcons = {
  verified: <Verified className="w-3 h-3" />,
  top_seller: <Crown className="w-3 h-3" />,
  fast_delivery: <Zap className="w-3 h-3" />,
  rank_specialist: <TrendingUp className="w-3 h-3" />,
  pro_player: <Star className="w-3 h-3" />,
  money_back: <Shield className="w-3 h-3" />,
  instant_delivery: <Flame className="w-3 h-3" />
};

export default function MobileMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-bg backdrop-blur-md border-b border-secondary/20 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-neon-cyan">Marketplace</h1>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skins, accounts, services..."
              className="mobile-input pl-10 focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan"
              data-testid="marketplace-search"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              className={`flex-shrink-0 mobile-card p-3 flex items-center space-x-2 transition-all active:scale-95 ${
                selectedCategory === category.name ? 'ring-2 ring-neon-cyan/50 bg-neon-cyan/10' : 'hover:bg-secondary/20'
              }`}
              data-testid={`category-${category.name.toLowerCase()}`}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="text-left">
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-text-secondary flex items-center space-x-1">
                  <span>{category.count}</span>
                  {category.trending && <Flame className="w-3 h-3 text-neon-red" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="px-4 space-y-4">
        {listings.map((listing) => (
          <div key={listing.id} className="mobile-card p-4 animate-slide-up">
            {/* Listing Header */}
            <div className="flex items-start space-x-4">
              {/* Item Image */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                listing.rarity === 'Legendary' ? 'bg-gradient-to-br from-neon-red/30 to-neon-purple/30 shadow-neon' :
                listing.rarity === 'Rare' ? 'bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30' :
                'bg-gradient-to-br from-neon-cyan/20 to-primary-gaming'
              }`}>
                {listing.image}
                {listing.trending && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-red rounded-full flex items-center justify-center">
                    <Flame className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{listing.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                      <Badge variant="outline" className="border-neon-cyan/30 text-neon-cyan text-xs">
                        {listing.game}
                      </Badge>
                      <span>•</span>
                      <span>{listing.condition}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold neon-purple">{listing.price}</div>
                    {listing.originalPrice && (
                      <div className="text-xs text-text-secondary line-through">{listing.originalPrice}</div>
                    )}
                  </div>
                </div>
                
                {/* Trust Badges */}
                <div className="flex items-center space-x-2 mb-3">
                  {listing.trustBadges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        badge === 'verified' ? 'bg-neon-green/20 text-neon-green' :
                        badge === 'top_seller' ? 'bg-neon-red/20 text-neon-red' :
                        'bg-neon-cyan/20 text-neon-cyan'
                      }`}
                    >
                      {trustBadgeIcons[badge as keyof typeof trustBadgeIcons]}
                      <span className="capitalize">{badge.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
                
                {/* Seller Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-primary-gaming text-neon-purple text-xs">
                        {listing.seller.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-medium">{listing.seller.name}</span>
                        {listing.seller.verified && (
                          <Verified className="w-3 h-3 text-neon-green" />
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-neon-red fill-current" />
                          <span>{listing.seller.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{listing.seller.sales} sales</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="bg-neon-cyan hover:bg-neon-cyan/80 text-white mobile-button"
                    data-testid={`buy-${listing.id}`}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MobileBottomNav />
    </div>
  );
}