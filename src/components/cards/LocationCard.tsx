import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";

import {

  provideConversionTrackingAnalytics,
 
} from "@yext/analytics";
import * as React from "react";
import { SvgIcons } from "../../SvgIcon";
import OpenCloseStatus from "../OpenCloseStatus";
import { formatPhoneNumber } from "react-phone-number-input";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

//prettier-ignore
export interface LocationCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface LocationCardProps extends CardProps {
  configuration: LocationCardConfig
}

//prettier-ignore
interface Address {
  line1: string,
  city: string,
  countryCode: string,
  postalCode: string,
  region: string
}

//prettier-ignore
export interface Interval {
  start: string,
  end: string
}

//prettier-ignore
interface DayHours {
  isClosed: boolean,
  // TODO: change to optional field
  openIntervals: Interval[]
}

//prettier-ignore
export interface Hours {
  monday: DayHours,
  tuesday: DayHours,
  wednesday: DayHours,
  thursday: DayHours,
  friday: DayHours,
  saturday: DayHours,
  sunday: DayHours
}

//prettier-ignore
export interface LocationData {
  id: string,
  address?: Address,
  name?: string,
  hours?: Hours,
  photoGallery?: any
}

const builtInCssClasses = {
  container: "result result-card",
  header: "location-name",
  body: "location-address",
  descriptionContainer: "text-sm",
  ctaContainer: "flex flex-col justify-between ml-4",
  cta1: "min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow",
  cta2: "min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow",
  ordinal: "mr-1.5 text-lg font-medium",
  title: "text-lg font-medium font-body font-bold",
  ctaButton:
    "flex justify-center border-2 w-full rounded-md self-center	align-middle mt-4 hover:bg-green-900",
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function LocationCard(props: LocationCardProps): JSX.Element {
  const { result } = props;
  const location = result.rawData as unknown as LocationData;
  const load: any = result.rawData;
  const addressLine1: any = load.address.line1;
  const AddressCity: any = load.address.city;
  const StoreHours: number = load.hours;
  const CtaAddress = addressLine1 + "," + AddressCity;
  const PhoneNumber = load.mainPhone;
  const distance = result.distance;

  const cssClasses = useComposedCssClasses(builtInCssClasses);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answersActions = useSearchActions();
  const query = useSearchState(state => state.query.input);
  
  function renderTitle(title: string) {
    return <h2>{title}</h2>;
  }

  function renderAddress(address?: Address) {
    if (!address) return;
    return (
      <>
        <div className="location-pin">{SvgIcons.locationMarker}</div>
        <div className="address-content">
          <p>{location.address?.line1}</p>
          <p>{`${location.address?.city}, ${location.address?.region} ${location.address?.postalCode}`}</p>
        </div>
      </>
    );
  }





  const conversionTracker = provideConversionTrackingAnalytics();

  /**
   * This function is for Analytics - When someone click on Button then this fire.
   */
  const pagesAnalyticsCtaClick = () => {
    conversionTracker.trackConversion({
      cookieId: "12466678",
      cid: "12beefd3-a43a-4232-af23-e3d4ab66f889",
      cv: "1",
      location: "location",
    });
    searchAnalytics.report({
      type: "CTA_CLICK",
      entityId: "1",
      verticalKey: "locations",
      searcher: "VERTICAL",
      queryId: "0184cd25-a8b8-bfc5-0bec-9b8bf538a2de",
    });
  };

  return (
    // 
      // 
      <>
      <div className={cssClasses.container}>
      <div className="location-seprator">
        <div className="left-content">
          <div className={cssClasses.header}>
         
            {renderTitle(location.name || "")}
          </div>
          {/* Location Address */}
          <div className="address-wrapper">
            <div className={cssClasses.body + ""}>
              {renderAddress(location.address)}
            </div>
            <div className="open-close-status">
              <div className="flex items-center gap-3">
                {SvgIcons.ClockIcon}

                <span>
                  <OpenCloseStatus hours={StoreHours} />
                </span>
              </div>
            </div>
          </div>
          {/* Location Address */}
          <div className="location-phone">
            <div className="phone-icon">{SvgIcons.locationPhone}</div>
            <div className="phone-content">
              <a target="_self"  rel="noreferrer" href={`tel:${PhoneNumber}`}>
                <span>{formatPhoneNumber(PhoneNumber)}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="right-buttons">
          <div className="miles">
            {(query === undefined || query.length === 0 || !distance) ?  "": <>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              
              <path
                d="M0 0H1.19922V12.06H0V0ZM7.19531 4.221L2.39844 7.5978V0.8442L7.19531 4.221Z"
                fill="currentColor"
              />
            </svg>
            {metersToMiles(distance)} mi</>}
          

          </div>
          <div className="call-CTA">
          <a
              target="_self"
              className="button"
              rel="noreferrer"
              href={`tel:${PhoneNumber}`}>
            CALL
          </a>
           
          </div>
          <div className="location-CTA">
            <a
              target="_blank"
              className="button"
              rel="noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&destination=${CtaAddress}`}
              onClick={() => pagesAnalyticsCtaClick()}
            >
              <span className="">GET DIRECTION</span>
            </a>
          </div>
        </div>
        </div> 
        </div>
        </>
       
    // {/* </div> */}
  );
}
