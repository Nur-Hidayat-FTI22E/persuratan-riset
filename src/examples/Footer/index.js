import Link from "@mui/material/Link";
import typography from "assets/theme/base/typography";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

function Footer({ company, links }) {
  const { size } = typography;

  // Default company values in case company is not provided
  const defaultCompany = {
    href: "#", // Default href
    name: "Your Company", // Default name
  };

  // Default links array in case links is not provided
  const defaultLinks = [
    { name: "Link 1", href: "#" },
    { name: "Link 2", href: "#" },
    { name: "Link 3", href: "#" },
  ];

  // Use default values if company or links are not provided
  const { href, name } = company || defaultCompany;
  const renderedLinks = links || defaultLinks;

  const renderLinks = () =>
    renderedLinks.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SoftTypography>
        </Link>
      </SoftBox>
    ));

  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, by{" "}
        <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Link href={href} target="_blank">
            {name}
          </Link>
        </SoftBox>
      </SoftBox>
      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </SoftBox>
    </SoftBox>
  );
}

Footer.propTypes = {
  company: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};

export default Footer;
