import classNames from "classnames";
import propTypes from "prop-types";

/**
 @typedef titleProps
 @type {Object}
 @property {"dark"|"light"} theme 
 */

/**
 * @param {titleProps} props
 */
function TitleLockup({ theme, isSubtitled, isSmall }) {
  const stylesOnEveryH1 = "text-center font-italiana";
  const stylesOnEveryP = "text-center text-2xl";

  let colorThemeStyles;

  if (theme === "light") {
    colorThemeStyles = "text-white";
  } else if (theme === "dark") {
    colorThemeStyles = "text-black";
  }

  let h1Size;

  if (isSmall) {
    h1Size = "text-7xl";
  } else {
    h1Size = "text-8xl";
  }

  const finalH1Styles = classNames(stylesOnEveryH1, colorThemeStyles, h1Size);
  const finalPStyles = classNames(stylesOnEveryP, colorThemeStyles);

  return (
    <div>
      <h1 className={finalH1Styles}>Dao Book</h1>
      {isSubtitled && <p className={finalPStyles}>The way of clinic notes</p>}
    </div>
  );
}

TitleLockup.propTypes = {
  theme: propTypes.string,
  isSubtitled: propTypes.bool,
};

export default TitleLockup;
