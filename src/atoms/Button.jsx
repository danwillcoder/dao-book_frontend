import classNames from 'classnames';
import propTypes from 'prop-types';

/**
 @typedef buttonProps
 @type {Object}
 @property {'dark'|'neutral'|'inverted'|'light'} theme 
 @property {string} buttonText 
 @property {React.MouseEventHandler<HTMLButtonElement>} clickHandler
 */

/**
 * @param {buttonProps} props
 */
function Button({ theme, buttonText, clickHandler }) {
  const stylesOnEveryButton =
    'w-32 rounded-2xl border-4 px-2 py-2 font-sans font-semibold shadow-md';

  let buttonThemeStyles;

  if (theme === 'dark') {
    buttonThemeStyles =
      'border-daobook-amber bg-daobook-amber text-white dark:text-black';
  } else if (theme === 'neutral') {
    buttonThemeStyles = 'border-[#E3E3E3] bg-white text-black dark:bg-black';
  } else if (theme === 'inverted') {
    buttonThemeStyles =
      'border-white bg-daobook-amber text-white dark:border-black dark:text-black';
  } else if (theme === 'light') {
    buttonThemeStyles = 'border-daobook-amber text-daobook-amber dark:bg-black';
  }

  const finalStyles = classNames(stylesOnEveryButton, buttonThemeStyles);

  return (
    <button className={finalStyles} onClick={clickHandler}>
      {buttonText}
    </button>
  );
}

Button.propTypes = {
  theme: propTypes.string,
  buttonText: propTypes.string,
  clickHandler: propTypes.func,
};

export default Button;
