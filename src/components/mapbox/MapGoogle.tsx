import { Wrapper } from "@googlemaps/react-wrapper";
import * as React from "react";
import { useRef, useEffect, useState, useContext } from "react";
import {  useComposedCssClasses } from "..//../hooks/useComposedCssClasses";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LocationContext } from "../LocationContext";
import chevron from "../../icons/pin.svg";
import activePin from "../../icons/active_pin.svg";
import { SvgIcons } from "../../SvgIcon";

/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  refLcation: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;

let mapMarkerClusterer: { clearMarkers: () => void } | null = null;
let infoWindow: any = null;
let openMapCenter: any = "";
let openMapZoom: any = "";
let openInfoWindow: any = false;
let searchCenter: any = null;
const searchZoom: any = null;
let stopAnimation = false;
let currentMapZoom = 0;

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer:
    "w-full h-[25.563rem] sm:h-[21.563rem] lg:h-[16.563rem] top-0 order-1 lg:order-none z-[1]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <Wrapper apiKey={props.apiKey}>
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  providerOptions,
  customCssClasses,
  refLcation,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [center] = useState<google.maps.LatLngLiteral>({
    lat: centerLatitude,
    lng: centerLongitude,
  });
  const { state } = useContext(LocationContext);
  const locationResults = state.mapLocations || [];
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const containerCssClass = cssClasses.googleMapsContainer;
  /*if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }*/
  const pinStyles = {
    fill: "#4e9c34", //default google red
    stroke: "#4e9c34",
    text: "white",
    fill_selected: "#2c702e",
    stroke_selected: "#4e9c34",
    text_selected: "white",
  };
  const marker_icon = {
    url: chevron,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };
  const marker_hover_icon = {
    url: activePin,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };
  if (!infoWindow) {
    infoWindow = new google.maps.InfoWindow();
  }
  // map?.setZoom(6);

  function zoomMapTo(map: any, zoomTo: any, centerToSet: any = false) {
    currentMapZoom = typeof map?.getZoom() != "undefined" ? map?.getZoom() : 6;
    const newZoom = currentMapZoom > zoomTo ? currentMapZoom - 1 : currentMapZoom + 1;

    map?.setZoom(newZoom);
    if (newZoom != zoomTo && !stopAnimation)
      sleep(30).then(() => {
        zoomMapTo(map, zoomTo, centerToSet);
      });
    if (newZoom == zoomTo) {
      stopAnimation = false;
      if (centerToSet) {
        if (typeof map?.panTo != "undefined") {
          map.panTo(centerToSet);
        } else {
          map?.setCenter(centerToSet);
        }
      }
    }
  }

  function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  deleteMarkers();

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  let index = 0;

  for (const result of locationResults) {
   
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markerPins.current.push(marker);
    index++;
  }

  if (markerPins.current.length > 0) {
    const markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({ map, markers });
  }

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          styles: [
            {
              featureType: "administrative",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ],
          ...providerOptions,
        })
      );
    }
  }, [center, map, providerOptions, zoom]);


  useEffect(()=>{
    if(map){
      setTimeout(()=>{
        var elements = document.getElementsByClassName("gm-control-active");
        for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', ()=>{
            if(infoWindow){
              infoWindow.close();
            }
          }, false);
        }
      }, 1000);
    }
  },[map])

  useEffect(() => {
    if (markerPins.current.length > 0 && map) {

      map.setZoom(6);
      
      map.fitBounds(bounds);
       map.panToBounds(bounds);
       if (zoom > 8) {
         map.setZoom(6);
       }
       
    
      searchCenter = bounds.getCenter();

      const elements = refLcation.current.querySelectorAll(".result");
      for (let index = 0; index < elements.length; index++) {
        /* Checking for the event binded or not if not then binding event */
        if (!elements[index]?.classList.contains("markerEventBinded")) {
          elements[index].classList.add("markerEventBinded");
          elements[index].addEventListener("click", () => {

            InfowindowContents(index, locationResults[index]);
            
            addActiveGrid(index);
            addClickGrid(index);
            scrollToRow(index);

            const position = getPosition(locationResults[index]);
            const latLng = new google.maps.LatLng(position.lat, position.lng);
            map.panTo(latLng);
            zoomMapTo(map, 20, latLng);
            infoWindow.open(map, markerPins.current[index]);
            openInfoWindow = true;
          });

          elements[index].addEventListener("mouseover", () => {
            markerPins.current[index]?.setIcon(marker_hover_icon);
            addActiveGrid(index);
          });

          elements[index].addEventListener("mouseout", () => {
          markerPins.current[index]?.setIcon(marker_icon);
          });
        }
      }
    }
  });

  for (let i = 0; i < markerPins.current.length; i++) {
    markerPins.current[i]?.addListener("click", () => {

      if (!openInfoWindow) {
        openMapZoom = map?.getZoom();
        openMapCenter = map?.getCenter();
      } else {
        openInfoWindow = false;
        infoWindow.close();
      }

      InfowindowContents(i, locationResults[i]);
      infoWindow.open(map, markerPins.current[i]);
      openInfoWindow = true;

    });
  }

  infoWindow.addListener("closeclick", () => {
    infoWindow.close();
    openInfoWindow = false;
  });

  function InfowindowContents(i: number, result: any): void {
   
    const MarkerContent = (
      <div className="markerContent font-universpro font-normal text-darkgrey text-xs md:text-sm leading-6">
        <div className="nameData text-base md:text-lg font-fontMyriadRegular text-primaryBlue mb-2">
          {result.name}
        </div>
        <div className="addressData flex justify-start gap-2 mb-2">
          <div className="icon">
            { SvgIcons.locationMarker }
          </div>
          <div className="address">
            <p>{ result.address?.line1 }</p>
            <p>{ `${result.address?.city}, ${result.address?.region}` }</p>
            <p>{ result.address?.postalCode }</p>
          </div>
        </div>
        <div className="phone ">
          <div className="addressphone flex justify-start gap-2 mb-2">
            {SvgIcons.locationPhone}
            <button>
              <a className="phone"  href={`tel:${result.mainPhone}`}>
                {result.mainPhone}
              </a>
            </button>
          </div>
        </div>
        <div className="button-bx map-card ">
          <a
            className="button"
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=${result.address?.line1 + "," + result.address.city}`}
            rel="noreferrer"
          >
           GET DIRECTION
          </a>
          <a
               target="_self"
               className="button"
              rel="noreferrer"
              href={`tel:${result.mainPhone}`}>
            CALL
          </a>
        </div>

        <div className="hours">{result.hours} </div>
      </div>
    );
    const string = renderToString(MarkerContent);
    infoWindow.setContent(string);
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  return <div className={containerCssClass} ref={ref} />;
}

// TEMPORARY FIX
function getPosition(result: any) {
  const lat = (result as any).yextDisplayCoordinate.latitude;
  const lng = (result as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}


function addActiveGrid(index: any) {
  const elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("active");
  }
  document.querySelectorAll(".result")[index]?.classList.add("active");
}

function addClickGrid(index: any) {
  const elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("click-active");
  }
  document.querySelectorAll(".result")[index]?.classList.add("click-active");
}

function scrollToRow(index: any) {
  const result: any = [].slice.call( document.querySelectorAll(`.result`) || [] )[0];
  const offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[index];
  const o = offset.offsetTop - result.offsetTop;
  [].slice
    .call(document.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: any) {
      el.scrollTop = o;
  });
}