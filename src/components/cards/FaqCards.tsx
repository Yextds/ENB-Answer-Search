import { CardProps } from "../../models/cardComponent";
import {useState } from "react";
import * as React from "react";

//prettier-ignore
export interface TrainerCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

//prettier-ignore
export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

//prettier-ignore
export interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

//prettier-ignore
interface PrimaryPhoto {
  image?: Image
}

//prettier-ignore
export interface TrainerData {
  id: any | null | undefined;
  answer: string | undefined;
  name?: string,
  c_inspirationalQuote?: string,
  primaryPhoto?: PrimaryPhoto
}

//prettier-ignore
export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string,
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

//prettier-ignore
const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col p-4 shadow-sm my-2 align-items-center',
  descriptionContainer: 'w-full text-sm font-heading ',
  name: 'text-xl font-medium font-body font-bold text-black-300',
  ctaButton: 'flex border rounded-md mt-4 px-4 bg-green-300 justify-center hover:bg-orange-900',
  ctaButtonText: 'font-heading text-green font-bold text-base px-3 py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function FaqCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  const FaqVertical: any = result.rawData;
  const FaqLandingPage = FaqVertical.landingPageUrl
    ? FaqVertical.landingPageUrl
    : "#";
  //   const screenSize = useContext(ResponsiveContext);/
  const [faqClass, setFaqClass] = useState("");

  const cssClasses = builtInCssClasses;

  function renderName(name?: string) {
    return <h2 className={cssClasses.name}>{name}</h2>;
  }

  function renderQuote(quote?: string) {
    return <p>{quote}</p>;
  }

  /**
   * This function helps FAQ accordion to open ones at a time
   * @param e - Elements of the Div
   * @param index - Ordinal of the elements
   */
  const isShowContent = (e: any) => {
    // alert('Hello');

    const parent = e.target.parentNode.parentNode;
  
    if (parent.classList.contains("opened")) {
      setFaqClass("");
  
    } else {
      const acc = document.getElementsByClassName("faq-block"); // alert(acc.length);
      for (let s = 0; s < acc.length; s++) {
        acc[s].classList.remove("opened");
      }
  
      setFaqClass("opened");
      parent.classList.add("opened");
    }
  };

  return (
    <>
      <div className={"faq-block vertical-card " + trainer.id + " " + faqClass}>
        <div
          onClick={(e) => isShowContent(e, trainer.id)}
          className="vertical-card-heading"
        >
          {renderName(trainer.name)}
        </div>
        <div className="faq-content vertical-card-content">
          {renderQuote(trainer.answer)}
        </div>
        <div className="vertical-card-button">
          <a href={FaqLandingPage} className="button">
            Read more
          </a>
        </div>
      </div>
    </>
  );
}
