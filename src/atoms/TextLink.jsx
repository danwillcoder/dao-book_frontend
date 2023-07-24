import { Link } from "react-router-dom";

function TextLink({ paragraphText, linkText, linkDestination }) {
  return (
    <p>
      {paragraphText && paragraphText}
      {linkText && linkDestination && (
        <Link to={linkDestination}>{linkText}</Link>
      )}
    </p>
  );
}

export default TextLink;
