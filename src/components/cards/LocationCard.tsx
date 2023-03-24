import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import { useContext } from "react";
import { LocationContext } from "../LocationContext";
import { LocationActionTypes } from "../locationReducers";
import {
  providePagesAnalytics,
  CtaClick,
  provideConversionTrackingAnalytics,
  provideSearchAnalytics,
} from "@yext/analytics";
import * as React from "react";
import { SvgIcons } from "../../SvgIcon";

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
  container:
    "result result-card",
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

  const CtaAddress = addressLine1 + "," + AddressCity;
  const PhoneNumber = load.mainPhone;
  const LandingPage = load.landingPageUrl;
  // console.log(CtaAddress, "Data");
  const cssClasses = useComposedCssClasses(builtInCssClasses);

  const screenSize = "sm";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useContext(LocationContext);

  function renderTitle(title: string) {
    return <h2>{title}</h2>;
  }

  function renderAddress(address?: Address) {
    if (!address) return;
    return (
      <>
        <div className="location-pin">
          {SvgIcons.locationMarker}
        </div>
        <div className="address-content">
          <p>{location.address?.line1}</p>
          <p>{`${location.address?.city}, ${location.address?.region} ${location.address?.postalCode}`}</p>
        </div>
      </>
    );
  }

  const setHoveredLocation = () =>
    dispatch({
      type: LocationActionTypes.SetHoveredLocation,
      payload: { hoveredLocation: location },
    });

  const clearHoveredLocation = () =>
    dispatch({ type: LocationActionTypes.ClearHoveredLocation, payload: {} });

  const conversionTracker = provideConversionTrackingAnalytics();

  const searchAnalytics = provideSearchAnalytics({
    experienceKey: "prezzo-answer-experience",
    experienceVersion: "PRODUCTION",
    businessId: 3180300, // this comes from the url of your Yext account
  });

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
    <div
      id={"result-" + location.id}
      className={cssClasses.container}
      // onMouseOver={() => setHoveredLocation()}
      // onMouseLeave={() => clearHoveredLocation()}
    >
      <div className={cssClasses.header}>
        {/* {configuration.showOrdinal && result.index && renderOrdinal(result.index)} */}
        {renderTitle(location.name || "")}
      </div>
      <div className={cssClasses.body + ""}>
        {renderAddress(location.address)}
      </div>
      <div className="location-phone">
        <div className="phone-icon">
          {SvgIcons.locationPhone}
        </div>
        <div className="phone-content">
          <a target="_blank" href={`tel:${PhoneNumber}`}>
            <span>{PhoneNumber}</span>
          </a>
        </div>
      </div>
      <div className="location-CTA">
        <a
          target="_blank"
          className="button"
          href={`https://www.google.com/maps/dir/?api=1&destination=${CtaAddress}`}
          onClick={() => pagesAnalyticsCtaClick()}
        >
          <span className="">Get Direction</span>
        </a>
      </div>
    </div>
  );
}
