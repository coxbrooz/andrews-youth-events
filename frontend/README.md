
# PCEA St. Andrew's Youth Event Management System

A modern, fast, and attractive event management system built specifically for PCEA St. Andrew's Youth Church. This system helps manage events across all youth ministries with a beautiful, responsive interface.

## Features

### 🎯 Core Functionality
- **Event Management**: Create, view, and manage church events
- **Ministry Integration**: Support for all 15 youth ministries
- **Dashboard**: Beautiful overview with statistics and event cards
- **Search & Filter**: Quick search and filter by ministry
- **Responsive Design**: Works perfectly on all devices

### 🏛️ Supported Ministries
- Daybreak
- Prayers
- Debater's
- Kaka
- Waridi Dada
- Missions
- SFC
- Fisher's
- Crossroads
- Transition Team
- YAM
- SAFE
- Hospitality
- Joyful Sounds
- Youth Worship Team

### 🎨 Design Features
- Modern gradient backgrounds
- Animated cards with hover effects
- Glass morphism effects
- Beautiful color-coded ministry badges
- Smooth transitions and animations
- Professional typography with Inter font

### ⚡ Performance & SEO
- Fast loading with optimized components
- SEO-optimized meta tags
- Clean semantic HTML structure
- Responsive images and layouts
- Search engine friendly URLs

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Local Development
```bash
# Clone the repository
git clone [your-repo-url]
cd pcea-youth-events

# Install dependencies
npm install

# Start development server
npm run dev
```

### XAMPP Deployment
To deploy this system in XAMPP:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Copy files to XAMPP**:
   - Copy the entire `dist` folder contents to your XAMPP's `htdocs` directory
   - Create a new folder like `htdocs/pcea-events/`
   - Paste all files from the `dist` folder

3. **Configure Apache** (if needed):
   - Ensure Apache is running in XAMPP
   - Access the system via `http://localhost/pcea-events/`

4. **Backend Integration** (Optional):
   - The current system uses mock data
   - For full functionality, integrate with PHP backend APIs
   - Update API endpoints in the components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EventCard.tsx   # Individual event display
│   ├── StatsCard.tsx   # Statistics display
│   └── AddEventDialog.tsx # Add new event form
├── pages/              # Page components
│   └── Index.tsx       # Main dashboard
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css          # Global styles
```

## Customization

### Adding New Ministries
1. Open `src/pages/Index.tsx`
2. Add the new ministry to the `ministries` array
3. The system will automatically include it in filters and forms

### Changing Colors
1. Update color schemes in `src/components/EventCard.tsx`
2. Modify the `getMinistryColor` function
3. Add new gradient combinations

### Adding Features
1. Create new components in `src/components/`
2. Add routes if needed in `src/App.tsx`
3. Update the main dashboard in `src/pages/Index.tsx`

## SEO Optimization

The system includes:
- Semantic HTML structure
- Meta tags for social media sharing
- Optimized page titles and descriptions
- Clean URL structure
- Fast loading times
- Mobile-first responsive design

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For technical support or questions about the PCEA St. Andrew's Youth Event Management System, please contact the development team.

## License

This project is developed specifically for PCEA St. Andrew's Youth Church. Please respect the intended use and reach out for permission before using elsewhere.

---

**Built with ❤️ for PCEA St. Andrew's Youth Church**
