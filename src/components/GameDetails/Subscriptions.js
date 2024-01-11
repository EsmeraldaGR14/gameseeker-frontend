import React from "react";
import XboxGPLogo from "../Font-assets/Xbox Game Pass/console-game-pass.jpeg";
import PCGPLogo from "../Font-assets/Xbox Game Pass/pc-game-pass.jpeg";
import XboxGPCoreLogo from "../Font-assets/Xbox Game Pass/core-game-pass.jpeg"
import PSPlusEssential from "../Font-assets/PS Plus/ps-plus-essential-plan-thumbnail-01-12may22$en.png"
import PSPlusExtra from "../Font-assets/PS Plus/ps-plus-extra-plan-thumbnail-01-12may22$en (1).png";
import PSPlusPremium from "../Font-assets/PS Plus/ps-plus-premium-plan-thumbnail-01-12may22$en.png";
import AppleArcade from "../Font-assets/Apple_Arcade_icon.webp"
import EAPlay from "../Font-assets/logo-ea-play-2048.png"
import GeforceNow from "../Font-assets/gfn-square.webp"
import Ubisoft from "../Font-assets/ubisoft.jpeg"
import Nintendo from "../Font-assets/nintendo switch online.jpeg"

function Subscriptions({ subscriptions }) {
  const renderSubscriptionIcons = () => {
    const icons = [];

    if (subscriptions) {
      if (subscriptions.includes("Xbox Game Pass")) {
        icons.push(
          <img key="xbox game pass" src={XboxGPLogo} alt="Xbox" />
        );
      }

      if (subscriptions.includes("Xbox Game Pass Core")) {
        icons.push(
          <img key="xbox game pass" src={XboxGPCoreLogo} alt="Xbox" />
        );
      }

      if (subscriptions.includes("PC Game Pass")) {
        icons.push(<img key="pc game pass" src={PCGPLogo} alt="PC" />);
      }

      if (subscriptions.includes("PlayStation Plus Essential")) {
        console.log("true");
        icons.push(
          <img
            key="Playstation Plus Essential"
            src={PSPlusEssential}
            alt="Playstation"
          />
        );
      }

      if (subscriptions.includes("PlayStation Plus Premium")) {
        console.log(true);
        icons.push(
          <img
            key="Playstation Plus Premium"
            src={PSPlusPremium}
            alt="Playstation"
          />
        );
      }

      if (subscriptions.includes("PlayStation Plus Extra")) {
        icons.push(
          <img
            key="Playstation Plus Extra"
            src={PSPlusExtra}
            alt="Playstation"
          />
        );
      }

      if (subscriptions.includes("Apple Arcade")) {
        icons.push(<img key="Apple Arcade" src={AppleArcade} alt="Apple" />);
      }

      if (subscriptions.includes("EA Play")) {
        icons.push(<img key="EA Play" src={EAPlay} alt="EA Play" />);
      }

      if (subscriptions.includes("GeForce Now")) {
        icons.push(<img key="GeForce Now" src={GeforceNow} alt="GeForce Now" />);
      }

      if (subscriptions.includes("Ubisoft+")) {
        icons.push(<img key="Ubisoft+" src={Ubisoft} alt="Ubisoft+" />);
      }

      if (subscriptions.includes("Nintendo Switch Online")) {
        icons.push(<img key="Nintendo" src={Nintendo} alt="Nintendo" />);
      }

    }

    return icons;
  };

  return <div className="subscription-icons">{renderSubscriptionIcons()}</div>;
}

export default Subscriptions;
