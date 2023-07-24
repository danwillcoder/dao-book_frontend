/**
 @typedef formInputProps
 @type {Object}
 @property {'text' | 'number'} type 
 @property {string} inputValue
 @property {React.Dispatch<SetStateAction<string>>} setInputValue
 @property {string} labelText 
 @property {string} placeholderText 
 @property {boolean} doesAutocomplete 
 @property {boolean} isRequired 
 */

/**
 * @param {formInputProps} props
 */
function FormInput({
  type,
  inputValue,
  setInputValue,
  labelText,
  placeholderText,
  doesAutocomplete,
  isRequired,
}) {
  const handleChange = (e) => setInputValue(e.target.value);

  return (
    <div>
      <label className="block pb-2 text-xl">
        {labelText}
        {isRequired && "* (required)"}
      </label>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholderText}
        autoComplete={doesAutocomplete}
        required={isRequired}
        className="rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
      ></input>
    </div>
  );
}

export default FormInput;
