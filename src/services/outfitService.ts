import { Outfit, OutfitItem, OutfitRecommendation, UserPreferences, OccasionType, SeasonType } from '@/types/outfit';
import { WeatherData, getOutfitRecommendation } from './weatherService';

// Mock data for demonstration
const mockOutfitItems: OutfitItem[] = [
  // Casual items
  {
    id: '1',
    name: 'Blue Denim Jacket',
    type: 'outerwear',
    color: 'blue',
    season: ['spring', 'fall'],
    occasion: ['casual', 'party', 'concert'],
    gender: 'unisex',
  },
  {
    id: '2',
    name: 'White T-Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    occasion: ['casual', 'party', 'beach', 'concert'],
    gender: 'unisex',
  },
  {
    id: '3',
    name: 'Black Jeans',
    type: 'bottom',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['casual', 'business', 'party', 'concert', 'date'],
    gender: 'unisex',
  },
  {
    id: '4',
    name: 'Floral Dress',
    type: 'dress',
    color: 'multicolor',
    season: ['spring', 'summer'],
    occasion: ['casual', 'formal', 'party', 'date', 'beach'],
    gender: 'female',
  },
  {
    id: '5',
    name: 'Black Blazer',
    type: 'outerwear',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'party'],
    gender: 'unisex',
  },
  {
    id: '6',
    name: 'White Button-Up Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'date'],
    gender: 'unisex',
  },
  {
    id: '7',
    name: 'Khaki Pants',
    type: 'bottom',
    color: 'khaki',
    season: ['spring', 'summer', 'fall'],
    occasion: ['casual', 'business', 'interview'],
    gender: 'unisex',
  },
  {
    id: '8',
    name: 'Red Party Dress',
    type: 'dress',
    color: 'red',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'party', 'date', 'concert'],
    gender: 'female',
  },
  {
    id: '9',
    name: 'Sneakers',
    type: 'shoes',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    occasion: ['casual', 'sport', 'beach', 'hiking', 'concert'],
    gender: 'unisex',
  },
  {
    id: '10',
    name: 'Dress Shoes',
    type: 'shoes',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'date'],
    gender: 'unisex',
  },
  {
    id: '11',
    name: 'Statement Necklace',
    type: 'accessory',
    color: 'gold',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'party', 'date'],
    gender: 'female',
  },
  {
    id: '12',
    name: 'Colorful Scarf',
    type: 'accessory',
    color: 'multicolor',
    season: ['fall', 'winter'],
    occasion: ['casual', 'formal', 'party'],
    gender: 'unisex',
  },
  {
    id: '13',
    name: 'Black Suit',
    type: 'outerwear',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'interview', 'wedding'],
    gender: 'male',
  },
  {
    id: '14',
    name: 'Black Dress',
    type: 'dress',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'party', 'date', 'concert'],
    gender: 'female',
  },
  {
    id: '15',
    name: 'Black Slacks',
    type: 'bottom',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'business', 'interview'],
    gender: 'unisex',
  },
  {
    id: '16',
    name: 'White Button-Up Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'business', 'interview'],
    gender: 'unisex',
  },
  {
    id: '17',
    name: 'Black Dress Shoes',
    type: 'shoes',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'business', 'interview'],
    gender: 'unisex',
  },
  {
    id: '18',
    name: 'Black Tie',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'funeral', 'business', 'interview'],
    gender: 'male',
  },
  {
    id: '19',
    name: 'Navy Blazer',
    type: 'outerwear',
    color: 'navy',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'party'],
    gender: 'unisex',
  },
  {
    id: '20',
    name: 'Gray Suit',
    type: 'outerwear',
    color: 'gray',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview'],
    gender: 'male',
  },
  {
    id: '21',
    name: 'Navy Dress Pants',
    type: 'bottom',
    color: 'navy',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview'],
    gender: 'unisex',
  },
  {
    id: '22',
    name: 'Gray Dress Pants',
    type: 'bottom',
    color: 'gray',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview'],
    gender: 'unisex',
  },
  {
    id: '23',
    name: 'Blue Button-Up Shirt',
    type: 'top',
    color: 'blue',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'date'],
    gender: 'unisex',
  },
  {
    id: '24',
    name: 'Brown Dress Shoes',
    type: 'shoes',
    color: 'brown',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview', 'date'],
    gender: 'unisex',
  },
  {
    id: '25',
    name: 'Business Portfolio',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'formal', 'interview'],
    gender: 'unisex',
  },
  {
    id: '26',
    name: 'Athletic Shorts',
    type: 'bottom',
    color: 'black',
    season: ['spring', 'summer', 'fall'],
    occasion: ['sport', 'beach', 'hiking'],
    gender: 'unisex',
  },
  {
    id: '27',
    name: 'Athletic T-Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    occasion: ['sport', 'beach', 'hiking'],
    gender: 'unisex',
  },
  {
    id: '28',
    name: 'Athletic Socks',
    type: 'accessory',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['sport', 'beach', 'hiking'],
    gender: 'unisex',
  },
  {
    id: '29',
    name: 'Sports Bra',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['sport', 'beach', 'hiking'],
    gender: 'female',
  },
  {
    id: '30',
    name: 'Athletic Headband',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['sport', 'beach', 'hiking'],
    gender: 'unisex',
  },
  {
    id: '31',
    name: 'Black Tuxedo',
    type: 'outerwear',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding', 'party'],
    gender: 'male',
  },
  {
    id: '32',
    name: 'White Dress Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding', 'party', 'interview'],
    gender: 'unisex',
  },
  {
    id: '33',
    name: 'Black Bow Tie',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding', 'party'],
    gender: 'male',
  },
  {
    id: '34',
    name: 'Black Patent Leather Shoes',
    type: 'shoes',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding', 'party'],
    gender: 'unisex',
  },
  {
    id: '35',
    name: 'White Wedding Dress',
    type: 'dress',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding'],
    gender: 'female',
  },
  {
    id: '36',
    name: 'Pearl Necklace',
    type: 'accessory',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding', 'party', 'date'],
    gender: 'female',
  },
  {
    id: '37',
    name: 'White Veil',
    type: 'accessory',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'wedding'],
    gender: 'female',
  },
  {
    id: '38',
    name: 'Hockey Jersey',
    type: 'top',
    color: 'red',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '39',
    name: 'Hockey Pants',
    type: 'bottom',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '40',
    name: 'Hockey Socks',
    type: 'accessory',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '41',
    name: 'Hockey Skates',
    type: 'shoes',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '42',
    name: 'Hockey Helmet',
    type: 'accessory',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '43',
    name: 'Hockey Gloves',
    type: 'accessory',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  {
    id: '44',
    name: 'Hockey Stick',
    type: 'accessory',
    color: 'brown',
    season: ['fall', 'winter'],
    occasion: ['sport'],
    gender: 'unisex',
  },
  // Party items
  {
    id: '45',
    name: 'Sequined Dress',
    type: 'dress',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['party', 'concert', 'date'],
    gender: 'female',
  },
  {
    id: '46',
    name: 'Leather Jacket',
    type: 'outerwear',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['party', 'concert', 'date'],
    gender: 'unisex',
  },
  {
    id: '47',
    name: 'Graphic T-Shirt',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    occasion: ['casual', 'party', 'concert'],
    gender: 'unisex',
  },
  {
    id: '48',
    name: 'Ripped Jeans',
    type: 'bottom',
    color: 'blue',
    season: ['spring', 'summer', 'fall'],
    occasion: ['casual', 'party', 'concert'],
    gender: 'unisex',
  },
  {
    id: '49',
    name: 'Ankle Boots',
    type: 'shoes',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['casual', 'party', 'concert', 'date'],
    gender: 'unisex',
  },
  {
    id: '50',
    name: 'Statement Earrings',
    type: 'accessory',
    color: 'gold',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['party', 'concert', 'date'],
    gender: 'female',
  },
  // Beach items
  {
    id: '51',
    name: 'Swim Trunks',
    type: 'bottom',
    color: 'blue',
    season: ['spring', 'summer'],
    occasion: ['beach'],
    gender: 'male',
  },
  {
    id: '52',
    name: 'Bikini',
    type: 'top',
    color: 'multicolor',
    season: ['spring', 'summer'],
    occasion: ['beach'],
    gender: 'female',
  },
  {
    id: '53',
    name: 'Beach Cover-Up',
    type: 'outerwear',
    color: 'white',
    season: ['spring', 'summer'],
    occasion: ['beach'],
    gender: 'female',
  },
  {
    id: '54',
    name: 'Flip Flops',
    type: 'shoes',
    color: 'multicolor',
    season: ['spring', 'summer'],
    occasion: ['beach', 'casual'],
    gender: 'unisex',
  },
  {
    id: '55',
    name: 'Sunglasses',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall'],
    occasion: ['beach', 'casual', 'party'],
    gender: 'unisex',
  },
  // Hiking items
  {
    id: '56',
    name: 'Hiking Boots',
    type: 'shoes',
    color: 'brown',
    season: ['spring', 'summer', 'fall'],
    occasion: ['hiking'],
    gender: 'unisex',
  },
  {
    id: '57',
    name: 'Hiking Pants',
    type: 'bottom',
    color: 'khaki',
    season: ['spring', 'summer', 'fall'],
    occasion: ['hiking'],
    gender: 'unisex',
  },
  {
    id: '58',
    name: 'Moisture-Wicking Shirt',
    type: 'top',
    color: 'blue',
    season: ['spring', 'summer', 'fall'],
    occasion: ['hiking', 'sport'],
    gender: 'unisex',
  },
  {
    id: '59',
    name: 'Hiking Socks',
    type: 'accessory',
    color: 'gray',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['hiking'],
    gender: 'unisex',
  },
  {
    id: '60',
    name: 'Backpack',
    type: 'accessory',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['hiking', 'beach'],
    gender: 'unisex',
  },
  // Concert items
  {
    id: '61',
    name: 'Band T-Shirt',
    type: 'top',
    color: 'black',
    season: ['spring', 'summer', 'fall'],
    occasion: ['concert', 'casual'],
    gender: 'unisex',
  },
  {
    id: '62',
    name: 'Distressed Jeans',
    type: 'bottom',
    color: 'blue',
    season: ['spring', 'summer', 'fall'],
    occasion: ['concert', 'casual', 'party'],
    gender: 'unisex',
  },
  {
    id: '63',
    name: 'Concert Boots',
    type: 'shoes',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['concert', 'party'],
    gender: 'unisex',
  },
  {
    id: '64',
    name: 'Wristband',
    type: 'accessory',
    color: 'multicolor',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['concert', 'party'],
    gender: 'unisex',
  },
  // Date items
  {
    id: '65',
    name: 'Silk Blouse',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['date', 'party', 'formal'],
    gender: 'female',
  },
  {
    id: '66',
    name: 'Dark Jeans',
    type: 'bottom',
    color: 'blue',
    season: ['fall', 'winter'],
    occasion: ['date', 'casual', 'party'],
    gender: 'unisex',
  },
  {
    id: '67',
    name: 'Heeled Boots',
    type: 'shoes',
    color: 'black',
    season: ['fall', 'winter'],
    occasion: ['date', 'party', 'formal'],
    gender: 'female',
  },
  {
    id: '68',
    name: 'Dress Watch',
    type: 'accessory',
    color: 'silver',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['date', 'formal', 'business'],
    gender: 'unisex',
  },
  // Interview items
  {
    id: '69',
    name: 'Navy Suit',
    type: 'outerwear',
    color: 'navy',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['interview', 'business', 'formal'],
    gender: 'male',
  },
  {
    id: '70',
    name: 'Blouse',
    type: 'top',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['interview', 'business', 'formal'],
    gender: 'female',
  },
  {
    id: '71',
    name: 'Pencil Skirt',
    type: 'bottom',
    color: 'black',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['interview', 'business', 'formal'],
    gender: 'female',
  },
  {
    id: '72',
    name: 'Cufflinks',
    type: 'accessory',
    color: 'silver',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['interview', 'business', 'formal'],
    gender: 'male',
  },
  // Add more mock items as needed
];

export async function getOutfitRecommendations(
  weather: WeatherData,
  preferences: UserPreferences,
  occasion?: OccasionType
): Promise<OutfitRecommendation[]> {
  // In a real application, this would use a more sophisticated algorithm
  // and possibly integrate with a backend service
  
  const baseRecommendation = getOutfitRecommendation(weather);
  
  const recommendations: OutfitRecommendation[] = [];
  
  // Determine the occasion from the user's message if not provided
  let detectedOccasion: OccasionType = occasion || 'casual';
  
  // Check if the user mentioned a specific occasion in their message
  if (!occasion) {
    // This would be more sophisticated in a real app with NLP
    // For now, we'll use a simple keyword approach
    const userMessage = preferences.lastMessage || '';
    if (userMessage.toLowerCase().includes('funeral')) {
      detectedOccasion = 'funeral';
    } else if (userMessage.toLowerCase().includes('wedding') || userMessage.toLowerCase().includes('marry')) {
      detectedOccasion = 'wedding';
    } else if (userMessage.toLowerCase().includes('birthday')) {
      detectedOccasion = 'formal';
    } else if (userMessage.toLowerCase().includes('business') || userMessage.toLowerCase().includes('work') || userMessage.toLowerCase().includes('meeting')) {
      detectedOccasion = 'business';
    } else if (userMessage.toLowerCase().includes('sport') || userMessage.toLowerCase().includes('gym') || 
               userMessage.toLowerCase().includes('badminton') || userMessage.toLowerCase().includes('tennis') || 
               userMessage.toLowerCase().includes('basketball') || userMessage.toLowerCase().includes('running') ||
               userMessage.toLowerCase().includes('hockey') || userMessage.toLowerCase().includes('soccer') ||
               userMessage.toLowerCase().includes('football') || userMessage.toLowerCase().includes('baseball')) {
      detectedOccasion = 'sport';
    } else if (userMessage.toLowerCase().includes('party') || userMessage.toLowerCase().includes('club') || 
               userMessage.toLowerCase().includes('night out') || userMessage.toLowerCase().includes('celebration')) {
      detectedOccasion = 'party';
    } else if (userMessage.toLowerCase().includes('beach') || userMessage.toLowerCase().includes('pool') || 
               userMessage.toLowerCase().includes('swimming') || userMessage.toLowerCase().includes('vacation')) {
      detectedOccasion = 'beach';
    } else if (userMessage.toLowerCase().includes('hiking') || userMessage.toLowerCase().includes('trail') || 
               userMessage.toLowerCase().includes('outdoor') || userMessage.toLowerCase().includes('camping')) {
      detectedOccasion = 'hiking';
    } else if (userMessage.toLowerCase().includes('concert') || userMessage.toLowerCase().includes('music') || 
               userMessage.toLowerCase().includes('festival') || userMessage.toLowerCase().includes('show')) {
      detectedOccasion = 'concert';
    } else if (userMessage.toLowerCase().includes('date') || userMessage.toLowerCase().includes('romantic') || 
               userMessage.toLowerCase().includes('dinner') || userMessage.toLowerCase().includes('movie')) {
      detectedOccasion = 'date';
    } else if (userMessage.toLowerCase().includes('interview') || userMessage.toLowerCase().includes('job') || 
               userMessage.toLowerCase().includes('career') || userMessage.toLowerCase().includes('application')) {
      detectedOccasion = 'interview';
    }
  }
  
  // Create a basic outfit recommendation
  const outfit: Outfit = {
    id: Date.now().toString(),
    items: mockOutfitItems.filter(item => {
      // Filter items based on weather and preferences
      const isSeasonAppropriate = item.season.includes(getCurrentSeason());
      const isOccasionAppropriate = item.occasion.includes(detectedOccasion);
      
      // Filter out gender-inappropriate items
      let isGenderAppropriate = true;
      if (preferences.gender === 'male') {
        // Filter out items that are typically for females
        isGenderAppropriate = !item.name.toLowerCase().includes('bra') && 
                              !item.name.toLowerCase().includes('dress') &&
                              !item.name.toLowerCase().includes('skirt') &&
                              !item.name.toLowerCase().includes('heels') &&
                              !item.name.toLowerCase().includes('pearl') &&
                              !item.name.toLowerCase().includes('veil') &&
                              !item.name.toLowerCase().includes('blouse') &&
                              !item.name.toLowerCase().includes('bikini');
      } else if (preferences.gender === 'female') {
        // Filter out items that are typically for males
        isGenderAppropriate = !item.name.toLowerCase().includes('tuxedo') && 
                              !item.name.toLowerCase().includes('bow tie') &&
                              !item.name.toLowerCase().includes('cufflinks') &&
                              !item.name.toLowerCase().includes('swim trunks');
      }
      
      return isSeasonAppropriate && isOccasionAppropriate && isGenderAppropriate;
    }),
    occasion: detectedOccasion,
    season: getCurrentSeason(),
  };

  // Add specific reasoning based on occasion
  let reasoning = baseRecommendation;
  if (detectedOccasion === 'funeral') {
    reasoning = "For a funeral, I've selected appropriate dark, formal attire that shows respect. Black is the traditional color for funerals, and formal clothing is expected.";
  } else if (detectedOccasion === 'wedding') {
    reasoning = "For your wedding day, I've selected formal, elegant attire that's appropriate for this special occasion. A wedding is one of the most important days of your life, and your outfit should reflect that.";
  } else if (detectedOccasion === 'formal') {
    reasoning += " For a formal occasion like a birthday party, I've selected items that are both stylish and appropriate.";
  } else if (detectedOccasion === 'business') {
    reasoning = "For a business meeting, I've selected professional attire that conveys competence and respect. Business meetings require a polished appearance with appropriate formal wear.";
  } else if (detectedOccasion === 'sport') {
    // Check for specific sports
    const userMessage = preferences.lastMessage || '';
    if (userMessage.toLowerCase().includes('hockey')) {
      reasoning = "For playing hockey, I've selected appropriate athletic wear and protective gear. Hockey requires specialized equipment for safety and performance on the ice.";
    } else {
      reasoning = "For physical activity, I've selected breathable, moisture-wicking athletic wear that allows for freedom of movement. Athletic clothing helps regulate body temperature during exercise.";
    }
  } else if (detectedOccasion === 'party') {
    reasoning = "For a party, I've selected stylish and comfortable items that will help you stand out. Party attire should be fun and expressive while still being appropriate for the occasion.";
  } else if (detectedOccasion === 'beach') {
    reasoning = "For a day at the beach, I've selected lightweight, breathable clothing that will keep you cool in the sun. Beach attire should be comfortable and allow for easy movement in and out of the water.";
  } else if (detectedOccasion === 'hiking') {
    reasoning = "For hiking, I've selected durable, moisture-wicking clothing that will keep you comfortable on the trail. Hiking attire should protect you from the elements while allowing for freedom of movement.";
  } else if (detectedOccasion === 'concert') {
    reasoning = "For a concert, I've selected stylish and comfortable items that will help you enjoy the music. Concert attire should be expressive and allow for dancing or standing for extended periods.";
  } else if (detectedOccasion === 'date') {
    reasoning = "For a date, I've selected stylish and flattering items that will help you make a good impression. Date attire should be appropriate for the activity while allowing you to express your personal style.";
  } else if (detectedOccasion === 'interview') {
    reasoning = "For an interview, I've selected professional attire that conveys competence and respect. Interview attire should be polished and appropriate for the industry you're applying to.";
  }

  // Add gender-specific reasoning
  if (preferences.gender) {
    if (preferences.gender === 'male') {
      reasoning += " As a male, I've selected items that are typically more suitable for men's fashion.";
    } else if (preferences.gender === 'female') {
      reasoning += " As a female, I've selected items that are typically more suitable for women's fashion.";
    }
  }

  // For business meetings, ensure we have at least one business-appropriate item
  if (detectedOccasion === 'business' && outfit.items.length === 0) {
    // Add some default business items if none were found
    outfit.items = [
      mockOutfitItems.find(item => item.name === 'Black Blazer') || mockOutfitItems[4],
      mockOutfitItems.find(item => item.name === 'White Button-Up Shirt') || mockOutfitItems[5],
      mockOutfitItems.find(item => item.name === 'Khaki Pants') || mockOutfitItems[6],
      mockOutfitItems.find(item => item.name === 'Dress Shoes') || mockOutfitItems[9]
    ].filter(Boolean) as OutfitItem[];
  }

  // For sports activities, ensure we have at least one sport-appropriate item
  if (detectedOccasion === 'sport' && outfit.items.length === 0) {
    // Check for specific sports
    const userMessage = preferences.lastMessage || '';
    if (userMessage.toLowerCase().includes('hockey')) {
      // Add hockey-specific items
      outfit.items = [
        mockOutfitItems.find(item => item.name === 'Hockey Jersey') || mockOutfitItems[38],
        mockOutfitItems.find(item => item.name === 'Hockey Pants') || mockOutfitItems[39],
        mockOutfitItems.find(item => item.name === 'Hockey Socks') || mockOutfitItems[40],
        mockOutfitItems.find(item => item.name === 'Hockey Skates') || mockOutfitItems[41],
        mockOutfitItems.find(item => item.name === 'Hockey Helmet') || mockOutfitItems[42],
        mockOutfitItems.find(item => item.name === 'Hockey Gloves') || mockOutfitItems[43],
        mockOutfitItems.find(item => item.name === 'Hockey Stick') || mockOutfitItems[44]
      ].filter(Boolean) as OutfitItem[];
      
      // Filter out gender-inappropriate items
      if (preferences.gender === 'male') {
        outfit.items = outfit.items.filter(item => 
          !item.name.toLowerCase().includes('bra') && 
          !item.name.toLowerCase().includes('dress') &&
          !item.name.toLowerCase().includes('skirt') &&
          !item.name.toLowerCase().includes('heels') &&
          !item.name.toLowerCase().includes('pearl') &&
          !item.name.toLowerCase().includes('veil')
        );
      }
    } else {
      // Add some default sport items if none were found
      let defaultSportItems = [
        mockOutfitItems.find(item => item.name === 'Athletic T-Shirt') || mockOutfitItems[27],
        mockOutfitItems.find(item => item.name === 'Athletic Shorts') || mockOutfitItems[26],
        mockOutfitItems.find(item => item.name === 'Sneakers') || mockOutfitItems[9],
        mockOutfitItems.find(item => item.name === 'Athletic Socks') || mockOutfitItems[28]
      ].filter(Boolean) as OutfitItem[];
      
      // Filter out gender-inappropriate items
      if (preferences.gender === 'male') {
        defaultSportItems = defaultSportItems.filter(item => 
          !item.name.toLowerCase().includes('bra') && 
          !item.name.toLowerCase().includes('dress') &&
          !item.name.toLowerCase().includes('skirt') &&
          !item.name.toLowerCase().includes('heels') &&
          !item.name.toLowerCase().includes('pearl') &&
          !item.name.toLowerCase().includes('veil')
        );
      }
      
      outfit.items = defaultSportItems;
    }
  }

  // For party occasions, ensure we have at least one party-appropriate item
  if (detectedOccasion === 'party' && outfit.items.length === 0) {
    // Add some default party items if none were found
    let defaultPartyItems = [
      mockOutfitItems.find(item => item.name === 'Leather Jacket') || mockOutfitItems[46],
      mockOutfitItems.find(item => item.name === 'Graphic T-Shirt') || mockOutfitItems[47],
      mockOutfitItems.find(item => item.name === 'Ripped Jeans') || mockOutfitItems[48],
      mockOutfitItems.find(item => item.name === 'Ankle Boots') || mockOutfitItems[49]
    ].filter(Boolean) as OutfitItem[];
    
    // Filter out gender-inappropriate items
    if (preferences.gender === 'male') {
      defaultPartyItems = defaultPartyItems.filter(item => 
        !item.name.toLowerCase().includes('bra') && 
        !item.name.toLowerCase().includes('dress') &&
        !item.name.toLowerCase().includes('skirt') &&
        !item.name.toLowerCase().includes('heels') &&
        !item.name.toLowerCase().includes('pearl') &&
        !item.name.toLowerCase().includes('veil')
      );
    }
    
    outfit.items = defaultPartyItems;
  }

  // For beach occasions, ensure we have at least one beach-appropriate item
  if (detectedOccasion === 'beach' && outfit.items.length === 0) {
    // Add some default beach items if none were found
    let defaultBeachItems = [
      mockOutfitItems.find(item => item.name === 'Swim Trunks') || mockOutfitItems[51],
      mockOutfitItems.find(item => item.name === 'Bikini') || mockOutfitItems[52],
      mockOutfitItems.find(item => item.name === 'Beach Cover-Up') || mockOutfitItems[53],
      mockOutfitItems.find(item => item.name === 'Flip Flops') || mockOutfitItems[54],
      mockOutfitItems.find(item => item.name === 'Sunglasses') || mockOutfitItems[55]
    ].filter(Boolean) as OutfitItem[];
    
    // Filter out gender-inappropriate items
    if (preferences.gender === 'male') {
      defaultBeachItems = defaultBeachItems.filter(item => 
        !item.name.toLowerCase().includes('bra') && 
        !item.name.toLowerCase().includes('dress') &&
        !item.name.toLowerCase().includes('skirt') &&
        !item.name.toLowerCase().includes('heels') &&
        !item.name.toLowerCase().includes('pearl') &&
        !item.name.toLowerCase().includes('veil') &&
        !item.name.toLowerCase().includes('bikini')
      );
    }
    
    outfit.items = defaultBeachItems;
  }

  // For hiking occasions, ensure we have at least one hiking-appropriate item
  if (detectedOccasion === 'hiking' && outfit.items.length === 0) {
    // Add some default hiking items if none were found
    outfit.items = [
      mockOutfitItems.find(item => item.name === 'Hiking Boots') || mockOutfitItems[56],
      mockOutfitItems.find(item => item.name === 'Hiking Pants') || mockOutfitItems[57],
      mockOutfitItems.find(item => item.name === 'Moisture-Wicking Shirt') || mockOutfitItems[58],
      mockOutfitItems.find(item => item.name === 'Hiking Socks') || mockOutfitItems[59],
      mockOutfitItems.find(item => item.name === 'Backpack') || mockOutfitItems[60]
    ].filter(Boolean) as OutfitItem[];
  }

  // For concert occasions, ensure we have at least one concert-appropriate item
  if (detectedOccasion === 'concert' && outfit.items.length === 0) {
    // Add some default concert items if none were found
    outfit.items = [
      mockOutfitItems.find(item => item.name === 'Band T-Shirt') || mockOutfitItems[61],
      mockOutfitItems.find(item => item.name === 'Distressed Jeans') || mockOutfitItems[62],
      mockOutfitItems.find(item => item.name === 'Concert Boots') || mockOutfitItems[63],
      mockOutfitItems.find(item => item.name === 'Wristband') || mockOutfitItems[64]
    ].filter(Boolean) as OutfitItem[];
  }

  // For date occasions, ensure we have at least one date-appropriate item
  if (detectedOccasion === 'date' && outfit.items.length === 0) {
    // Add some default date items if none were found
    let defaultDateItems = [
      mockOutfitItems.find(item => item.name === 'Silk Blouse') || mockOutfitItems[65],
      mockOutfitItems.find(item => item.name === 'Dark Jeans') || mockOutfitItems[66],
      mockOutfitItems.find(item => item.name === 'Heeled Boots') || mockOutfitItems[67],
      mockOutfitItems.find(item => item.name === 'Dress Watch') || mockOutfitItems[68]
    ].filter(Boolean) as OutfitItem[];
    
    // Filter out gender-inappropriate items
    if (preferences.gender === 'male') {
      defaultDateItems = defaultDateItems.filter(item => 
        !item.name.toLowerCase().includes('bra') && 
        !item.name.toLowerCase().includes('dress') &&
        !item.name.toLowerCase().includes('skirt') &&
        !item.name.toLowerCase().includes('heels') &&
        !item.name.toLowerCase().includes('pearl') &&
        !item.name.toLowerCase().includes('veil') &&
        !item.name.toLowerCase().includes('blouse')
      );
    }
    
    outfit.items = defaultDateItems;
  }

  // For interview occasions, ensure we have at least one interview-appropriate item
  if (detectedOccasion === 'interview' && outfit.items.length === 0) {
    // Add some default interview items if none were found
    let defaultInterviewItems = [
      mockOutfitItems.find(item => item.name === 'Navy Suit') || mockOutfitItems[69],
      mockOutfitItems.find(item => item.name === 'Blouse') || mockOutfitItems[70],
      mockOutfitItems.find(item => item.name === 'Pencil Skirt') || mockOutfitItems[71],
      mockOutfitItems.find(item => item.name === 'Cufflinks') || mockOutfitItems[72],
      mockOutfitItems.find(item => item.name === 'Dress Shoes') || mockOutfitItems[9]
    ].filter(Boolean) as OutfitItem[];
    
    // Filter out gender-inappropriate items
    if (preferences.gender === 'male') {
      defaultInterviewItems = defaultInterviewItems.filter(item => 
        !item.name.toLowerCase().includes('bra') && 
        !item.name.toLowerCase().includes('dress') &&
        !item.name.toLowerCase().includes('skirt') &&
        !item.name.toLowerCase().includes('heels') &&
        !item.name.toLowerCase().includes('pearl') &&
        !item.name.toLowerCase().includes('veil') &&
        !item.name.toLowerCase().includes('blouse')
      );
    }
    
    outfit.items = defaultInterviewItems;
  }

  // For wedding occasions, ensure we have at least one wedding-appropriate item
  if (detectedOccasion === 'wedding' && outfit.items.length === 0) {
    // Add some default wedding items if none were found
    if (preferences.gender === 'male') {
      outfit.items = [
        mockOutfitItems.find(item => item.name === 'Black Tuxedo') || mockOutfitItems[31],
        mockOutfitItems.find(item => item.name === 'White Dress Shirt') || mockOutfitItems[32],
        mockOutfitItems.find(item => item.name === 'Black Bow Tie') || mockOutfitItems[33],
        mockOutfitItems.find(item => item.name === 'Black Patent Leather Shoes') || mockOutfitItems[34]
      ].filter(Boolean) as OutfitItem[];
    } else if (preferences.gender === 'female') {
      outfit.items = [
        mockOutfitItems.find(item => item.name === 'White Wedding Dress') || mockOutfitItems[35],
        mockOutfitItems.find(item => item.name === 'Pearl Necklace') || mockOutfitItems[36],
        mockOutfitItems.find(item => item.name === 'White Veil') || mockOutfitItems[37]
      ].filter(Boolean) as OutfitItem[];
    }
  }

  recommendations.push({
    outfit,
    weatherContext: {
      temperature: weather.temperature,
      description: weather.description,
    },
    reasoning,
  });

  return recommendations;
}

function getCurrentSeason(): SeasonType {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

export async function saveOutfit(outfit: Outfit): Promise<void> {
  // In a real application, this would save to a database
  console.log('Saving outfit:', outfit);
}

export async function getUserPreferences(): Promise<UserPreferences> {
  // In a real application, this would fetch from a database
  return {
    style: ['casual', 'minimalist'],
    colors: ['blue', 'white', 'black'],
    occasions: ['casual', 'business'],
    weatherPreferences: {
      coldThreshold: 15,
      hotThreshold: 25,
    },
    lastMessage: '', // This would be set based on the user's last message
    gender: null, // This would be set based on the user's selection
  };
} 