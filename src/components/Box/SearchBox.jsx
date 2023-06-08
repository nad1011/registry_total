import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  color: "var(--avatar-color)",
  backgroundColor: "var(--secondary-color)",
  "&:hover": {
    backgroundColor: "var(--secondary-color)",
  },
  marginLeft: 0,
  width: "100%",
  height: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "var(--font2-color)",
  height: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "6ch",
      "&:focus": {
        width: "19ch",
      },
    },
  },
}));

const SearchBox = ({ placeholder, onChangeHandler }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon
          sx={{
            color: "var(--border-color)",
          }}
        />
      </SearchIconWrapper>
      <StyledInputBase placeholder={placeholder} onChange={onChangeHandler} />
    </Search>
  );
};

export default SearchBox;
