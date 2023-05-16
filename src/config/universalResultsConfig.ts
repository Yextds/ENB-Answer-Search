import { FaqCard } from '../components/cards/FaqCards';
import { VerticalConfig } from '../components/UniversalResults';
import { LocationCard } from '../components/cards/LocationCard';
import LocationSection from '../sections/LocationSection';
import { ProductsCard } from '../components/cards/ProductsCard';
import { LinksCard } from '../components/cards/LinksCard';
import { EnbCards } from '../components/cards/enbNewsCard';
import { EventCard } from '../components/cards/EventCard';

export type UniversalResultsConfig = Record<string, VerticalConfig>;
export const universallimit = 3;
export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    SectionComponent: LocationSection,
    label: 'Locations',
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