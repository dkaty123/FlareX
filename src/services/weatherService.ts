export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  pressure: number;
  location: string;
  timestamp: number;
  weatherCondition: string;
  uvIndex: number;
}

export interface ClimateRisk {
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  riskScore: number;
  factors: string[];
  recommendation: string;
}

export interface WeatherDerivative {
  id: string;
  type: 'temperature' | 'rainfall' | 'drought' | 'hurricane';
  location: string;
  strikeValue: number;
  currentValue: number;
  premium: number;
  expiry: number;
  payout: number;
  isActive: boolean;
}

export class WeatherService {
  private readonly apiKey: string | null = null;
  private readonly mockMode: boolean = true; // Always use mock mode for now

  constructor() {
    console.log('WeatherService initialized - using enhanced mock data with geolocation');
  }

  async getWeatherData(location?: string): Promise<WeatherData> {
    let detectedLocation = location;
    
    // Try to get user's real location
    if (!location) {
      try {
        detectedLocation = await this.detectUserLocation();
      } catch (error) {
        console.log('Could not detect location, using default');
        detectedLocation = 'San Francisco, CA';
      }
    }

    return this.generateRealisticWeatherData(detectedLocation || 'San Francisco, CA');
  }

  private async detectUserLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Use reverse geocoding to get location name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (response.ok) {
              const data = await response.json();
              const locationName = `${data.city || data.locality}, ${data.countryCode}`;
              console.log('Detected location:', locationName);
              resolve(locationName);
            } else {
              throw new Error('Geocoding failed');
            }
          } catch (error) {
            console.error('Error getting location name:', error);
            resolve('Unknown Location');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    });
  }

  private generateRealisticWeatherData(location: string): WeatherData {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const hour = now.getHours();
    
    // Seasonal temperature variations
    let baseTemp = 15; // Default
    if (location.toLowerCase().includes('california') || location.toLowerCase().includes('san francisco')) {
      baseTemp = month < 3 || month > 10 ? 12 : 20; // Winter/Summer
    } else if (location.toLowerCase().includes('florida') || location.toLowerCase().includes('miami')) {
      baseTemp = month < 3 || month > 10 ? 22 : 28;
    } else if (location.toLowerCase().includes('new york')) {
      baseTemp = month < 3 || month > 10 ? 2 : 25;
    } else if (location.toLowerCase().includes('london')) {
      baseTemp = month < 3 || month > 10 ? 5 : 18;
    }
    
    // Daily temperature variation
    const dailyVariation = Math.sin((hour - 6) * Math.PI / 12) * 8; // Peak at 2pm
    const temperature = baseTemp + dailyVariation + (Math.random() - 0.5) * 4;
    
    // Realistic humidity based on temperature and location
    const baseHumidity = location.toLowerCase().includes('desert') ? 25 : 
                        location.toLowerCase().includes('florida') ? 75 : 55;
    const humidity = Math.max(20, Math.min(95, baseHumidity + (Math.random() - 0.5) * 20));
    
    // Seasonal rainfall
    const isRainySeason = (month >= 10 || month <= 2); // Winter months
    const rainfallBase = isRainySeason ? 2 : 0.2;
    const rainfall = Math.max(0, rainfallBase + (Math.random() - 0.7) * 5);
    
    // Wind speed varies by location and weather
    const windSpeed = Math.max(0, 8 + (Math.random() - 0.5) * 15);
    
    // Atmospheric pressure
    const pressure = 1013 + (Math.random() - 0.5) * 40;
    
    // UV index based on time and season
    let uvIndex = 0;
    if (hour >= 8 && hour <= 18) {
      const sunIntensity = Math.sin((hour - 6) * Math.PI / 12);
      const seasonalMultiplier = month >= 4 && month <= 8 ? 1.2 : 0.8;
      uvIndex = Math.max(0, Math.min(11, sunIntensity * 10 * seasonalMultiplier));
    }
    
    // Weather condition based on other factors
    let weatherCondition = 'Clear';
    if (rainfall > 1) weatherCondition = 'Rain';
    else if (humidity > 80) weatherCondition = 'Clouds';
    else if (windSpeed > 20) weatherCondition = 'Windy';
    else if (temperature < 0) weatherCondition = 'Snow';

    return {
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity),
      rainfall: Math.round(rainfall * 10) / 10,
      windSpeed: Math.round(windSpeed * 10) / 10,
      pressure: Math.round(pressure),
      location,
      timestamp: Date.now(),
      weatherCondition,
      uvIndex: Math.round(uvIndex * 10) / 10
    };
  }

  calculateClimateRisk(weatherData: WeatherData): ClimateRisk {
    let riskScore = 0;
    const factors: string[] = [];

    // Temperature risk
    if (weatherData.temperature > 35 || weatherData.temperature < -10) {
      riskScore += 30;
      factors.push('Extreme temperature');
    }

    // Rainfall risk
    if (weatherData.rainfall > 5) {
      riskScore += 25;
      factors.push('Heavy rainfall');
    } else if (weatherData.rainfall === 0) {
      riskScore += 15;
      factors.push('Drought conditions');
    }

    // Wind risk
    if (weatherData.windSpeed > 15) {
      riskScore += 20;
      factors.push('High wind speeds');
    }

    // UV risk
    if (weatherData.uvIndex > 8) {
      riskScore += 10;
      factors.push('High UV exposure');
    }

    // Humidity risk
    if (weatherData.humidity > 80 || weatherData.humidity < 30) {
      riskScore += 15;
      factors.push('Extreme humidity');
    }

    let riskLevel: ClimateRisk['riskLevel'];
    let recommendation: string;

    if (riskScore >= 70) {
      riskLevel = 'extreme';
      recommendation = 'Immediate action required. Consider maximum hedging positions.';
    } else if (riskScore >= 50) {
      riskLevel = 'high';
      recommendation = 'High risk detected. Increase collateral requirements by 20%.';
    } else if (riskScore >= 30) {
      riskLevel = 'medium';
      recommendation = 'Moderate risk. Standard hedging recommended.';
    } else {
      riskLevel = 'low';
      recommendation = 'Low risk conditions. Optimal for farming activities.';
    }

    return {
      riskLevel,
      riskScore,
      factors,
      recommendation
    };
  }

  generateWeatherDerivatives(weatherData: WeatherData): WeatherDerivative[] {
    return [
      {
        id: 'temp-001',
        type: 'temperature',
        location: weatherData.location,
        strikeValue: 30,
        currentValue: weatherData.temperature,
        premium: 0.05,
        expiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        payout: weatherData.temperature > 30 ? 100 : 0,
        isActive: true
      },
      {
        id: 'rain-001',
        type: 'rainfall',
        location: weatherData.location,
        strikeValue: 2,
        currentValue: weatherData.rainfall,
        premium: 0.03,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        payout: weatherData.rainfall < 2 ? 150 : 0,
        isActive: true
      },
      {
        id: 'drought-001',
        type: 'drought',
        location: weatherData.location,
        strikeValue: 0.5,
        currentValue: weatherData.rainfall,
        premium: 0.08,
        expiry: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
        payout: weatherData.rainfall < 0.5 ? 200 : 0,
        isActive: true
      }
    ];
  }

  calculateYieldMultiplier(weatherData: WeatherData): number {
    const risk = this.calculateClimateRisk(weatherData);
    
    // Higher risk = higher yield to compensate
    switch (risk.riskLevel) {
      case 'extreme':
        return 2.5;
      case 'high':
        return 1.8;
      case 'medium':
        return 1.3;
      case 'low':
        return 1.0;
      default:
        return 1.0;
    }
  }
}
