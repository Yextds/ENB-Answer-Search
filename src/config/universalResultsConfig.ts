import { FaqCard } from '../components/cards/FaqCards';
import { VerticalConfig } from '../components/UniversalResults';
import { LocationCard } from '../components/cards/LocationCard';
import LocationSection from '../sections/LocationSection';


export type UniversalResultsConfig = Record<string, VerticalConfig>;
export const universallimit = 3;

export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    SectionComponent: LocationSection,
    label: 'LOCATIONS',
    viewAllButton: true,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false
    }
  },
  faqs: {
    label: 'FAQs',
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
      showOrdinal: false
    }
  }
}

export const socialLinks = {
  facebook: "https://www.facebook.com/EphrataNationalBank",
  twitter: "https://twitter.com/EphrataNational",
  linkedin: "https://www.linkedin.com/company/ephrata-national-bank?trk=top_nav_home",
  instagram: "https://www.instagram.com/ephratanationalbank/",
  youtube: "https://www.youtube.com/channel/UCADIbDyVlqGR0JEMBKCddEA",
  pinterest: "https://www.pinterest.com/EphrataNationalBank",
}