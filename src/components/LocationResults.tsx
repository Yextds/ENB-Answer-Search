import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { SectionConfig } from '../models/sectionComponent';
import AlternativeVerticals from './AlternativeVerticals';
import { StandardCard } from './cards/StandardCard';
import { LocationContext } from './LocationContext';
import { LocationActionTypes } from './locationReducers';
import Mapbox, { MapLocationData } from './mapbox/Mapbox';
import { VerticalResultsDisplay } from './VerticalResults';
import MapGoogle from "./mapbox/MapGoogle";
import * as React from 'react';
import { useSearchState } from '@yext/search-headless-react';


type LocationResultsProps = SectionConfig

export default function LocationResults(props: LocationResultsProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useContext(LocationContext);
  const results = useSearchState((state) => state.vertical.results) || [];
  const screenSize = 'xl';

  const { cardConfig } = props;
  const cardComponent = cardConfig?.CardComponent || StandardCard;
  const refLcation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapLocations: MapLocationData[] = [];
    for (const result of results) {
      const location = result.rawData as unknown as MapLocationData;
      if (result.id && location.yextDisplayCoordinate) {
        mapLocations.push({
          id: result.id ?? '',
          name: location.name,
          address: location.address,
          yextDisplayCoordinate: {
            latitude: location.yextDisplayCoordinate.latitude,
            longitude: location.yextDisplayCoordinate.longitude,
          },
        });
      }
    }
    dispatch({ type: LocationActionTypes.SetMapLocations, payload: { mapLocations } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);
  const googleMapsConfig = {
    centerLatitude: 26.8894208,
    centerLongitude: 75.8349824,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
  };
  const renderMap = () => {
    if (!state.mapLocations) return null;

    return <MapGoogle
      apiKey={googleMapsConfig.googleMapsApiKey}
      centerLatitude={googleMapsConfig.centerLatitude}
      centerLongitude={googleMapsConfig.centerLongitude}
      defaultZoom={0}
      showEmptyMap={true}
      refLcation={refLcation}
    />;
  };
  // const mobileMap = () => {
  //   if (!state.mapLocations) return null;

  //   return <Maps
  //   apiKey={googleMapsConfig.googleMapsApiKey}
  //   centerLatitude={googleMapsConfig.centerLatitude}
  //   centerLongitude={googleMapsConfig.centerLongitude}
  //   defaultZoom={0}
  //   showEmptyMap={true}
  //   refLcation={refLcation}
  // />;
  // };

  return (
    <div className="flex">
      <div
        ref={refLcation}
        className={classNames('overflow-y-auto sm:overflow-auto sm:border lg:w-1/4', {
          hidden: state.showMap,
          'w-full': !state.showMap,
        })}
        style={{ maxHeight: '580px' }}>
        {state.mapLocations && state.mapLocations.length > 0 ? (
          <VerticalResultsDisplay
            results={results}
            CardComponent={cardComponent}
            {...(cardConfig && { cardConfig })}
            customCssClasses={{ container: 'px-4 sm:px-0' }}
          />
        ) : state.noGymsMessage ? (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-xl">{state.noGymsMessage}</span>
          </div>
        ) : (
          <AlternativeVerticals
            currentVerticalLabel="Locations"
            verticalsConfig={[
              { label: 'FAQs', verticalKey: 'faqs' },
              { label: 'Events', verticalKey: 'events' },
            ]}
            cssCompositionMethod="assign"
            customCssClasses={{
              container: 'flex flex-col justify-between mb-4 p-4 shadow-sm',
              noResultsText: 'text-lg font-heading pb-2',
              categoriesText: 'font-body',
              suggestions: 'pt-4 ',
              suggestion: 'pb-4 text-gold font-heading',
              allCategoriesLink: 'text-gold cursor-pointer hover:underline focus:underline',
            }}
          />
        )}
      </div>
      <div className={classNames('w-full xl:w-3/4', { hidden: screenSize !== 'xl' && !state.showMap })}>
        {renderMap()}
      </div>
    </div>
  );
}
