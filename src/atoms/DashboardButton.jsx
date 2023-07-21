import propTypes from "prop-types";

/**
 @typedef dashboardButtonProps
 @type {Object}
 @property {string} buttonText 
 @property {React.MouseEventHandler<HTMLButtonElement>} clickHandler
 */

/**
 * @param {dashboardButtonProps} props
 */
function DashboardButton({ buttonText, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="min-w-full rounded-2xl border-4 border-daobook-amber bg-daobook-amber px-2 py-2 font-sans font-semibold text-white shadow-md ring-violet-500 transition-colors transition-transform hover:scale-105 hover:bg-daobook-amber/80 focus:ring active:brightness-75 dark:bg-black"
    >
      {buttonText}
    </button>
  );
}

DashboardButton.propTypes = {
  buttonText: propTypes.string,
  clickHandler: propTypes.func,
};

export default DashboardButton;
