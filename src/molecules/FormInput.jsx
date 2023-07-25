/**
 @typedef formInputProps
 @type {Object}
 @property {'text' | 'number' | 'email' | 'password'} type 
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
  name,
  onChange,
  labelText,
  placeholderText,
  doesAutocomplete,
  isRequired,
}) {
  return (
    <div>
      <label className="block pb-2 text-xl">
        {labelText}
        {isRequired && "* (required)"}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholderText}
        autoComplete={doesAutocomplete}
        required={isRequired}
        className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
      ></input>
    </div>
  );
}

export default FormInput;
