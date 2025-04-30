# Outfit Planner Chatbot

A modern web application that helps users plan their outfits based on weather conditions and personal preferences. The chatbot provides personalized outfit recommendations using weather data and user preferences.

## Features

- Real-time weather-based outfit recommendations
- Personalized outfit suggestions based on user preferences
- Modern chat interface with smooth animations
- Support for different occasions and seasons
- Responsive design that works on all devices

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenWeatherMap API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd outfit-planner
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Start a conversation with the chatbot by typing your message in the input field.
2. The chatbot will ask about your activities and preferences.
3. Based on your location's weather and your preferences, it will suggest appropriate outfits.
4. You can save favorite outfits and get recommendations for different occasions.

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenWeatherMap API
- Heroicons
- Headless UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
