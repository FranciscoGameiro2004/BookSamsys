import "./css/bookSearch.css";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Box,
  Slider,
  Typography,
  Rating,
  Drawer,
  Chip,
} from "@mui/material";
import {
  Search,
  RestartAlt,
  Tune,
  Category,
  EuroSymbol,
  Star,
} from "@mui/icons-material";

import {
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
  ChangeEvent,
  useState,
} from "react";
import { type SelectChangeEvent } from "@mui/material";

interface BookSearchProps {
  search: string;
  orderBy: string;
  sortBy: string;
  genreFilter: string;
  priceRange: number[];
  minRating: number;
  onlyAvailable: boolean;

  genreList: string[];

  onFormSubmit: FormEventHandler<HTMLFormElement>;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onSortChange: (e: SelectChangeEvent<string>) => void;
  onOrderChange: (e: ChangeEvent<HTMLInputElement>, input: string) => void;
  onGenreFilterChange: (e: SelectChangeEvent<string>) => void;
  onPriceRangeChange: (e: Event, newValue: number | number[]) => void;
  onMinRatingChange: (e: SyntheticEvent, newValue: number | null) => void;
  onOnlyAvailableChange: ChangeEventHandler<HTMLInputElement>;
  onResetFiltersClick: () => void;
  onRemoveGenreFilterClick: () => void;
  onRemoveOnlyAvailableFilterClick: () => void;
  onResetPriceRangeFilterClick: () => void;
  onResetMinRatingFilterClick: () => void;
}

export default function BookSearch({
  search,
  orderBy,
  sortBy,
  genreFilter,
  priceRange,
  minRating,
  onlyAvailable,
  genreList,
  onFormSubmit,
  onSearchChange,
  onSortChange,
  onOrderChange,
  onGenreFilterChange,
  onPriceRangeChange,
  onMinRatingChange,
  onOnlyAvailableChange,
  onResetFiltersClick,
  onRemoveGenreFilterClick,
  onRemoveOnlyAvailableFilterClick,
  onResetPriceRangeFilterClick,
  onResetMinRatingFilterClick,
}: BookSearchProps) {
  const [openFilters, setOpenFilters] = useState(false);

  const handleOpenFiltersClick = () => {
    setOpenFilters(true);
  };

  const handleCloseFiltersClick = () => {
    setOpenFilters(false);
  };

  return (
    <div>
      <form action="#" onSubmit={onFormSubmit}>
        <div className="searchContainer">
          <div className="searchBar">
            <TextField
              value={search}
              label="Pesquisar"
              id="search"
              onChange={onSearchChange}
              sx={{ width: 470, mr: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: 53, ml: 1 }}
            >
              <Search />
            </Button>
          </div>
          <div className="orderContainer">
            <FormControl sx={{ m: 1, minWidth: 150 }} className="orderItem">
              <InputLabel id="sortByLabel">Ordenar por</InputLabel>
              <Select
                label="Ordenar por"
                labelId="sortByLabel"
                name="sortBy"
                id="sortBy"
                value={sortBy}
                onChange={onSortChange}
              >
                <MenuItem value="">Nenhum</MenuItem>
                <MenuItem value="title">Nome</MenuItem>
                <MenuItem value="author">Autor</MenuItem>
                <MenuItem value="price">Preço</MenuItem>
                <MenuItem value="rating">Avaliação</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="orderItem">
              <FormLabel id="orderByLabel">Por ordem</FormLabel>
              <RadioGroup value={orderBy} onChange={onOrderChange}>
                <FormControlLabel
                  value="asc"
                  control={<Radio />}
                  label="Crescente"
                />
                <FormControlLabel
                  value="desc"
                  control={<Radio />}
                  label="Derescente"
                />
              </RadioGroup>
            </FormControl>
            <Button onClick={handleOpenFiltersClick}>
              <Tune />
            </Button>
          </div>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {genreFilter !== "" && (
              <Chip
                icon={<Category />}
                sx={{ m: 1 }}
                label={genreFilter.replace("&genre_eq=", "")}
                onDelete={onRemoveGenreFilterClick}
              />
            )}
            <Chip
              icon={<EuroSymbol />}
              sx={{ m: 1 }}
              label={`${priceRange[0]}€ - ${priceRange[1]}€`}
              onDelete={onResetPriceRangeFilterClick}
              deleteIcon={<RestartAlt />}
            />
            <Chip
              icon={<Star />}
              sx={{ m: 1 }}
              label={`${minRating} ou mais`}
              onDelete={onResetMinRatingFilterClick}
              deleteIcon={<RestartAlt />}
            />
            {onlyAvailable && (
              <Chip
                sx={{ m: 1 }}
                label="Disponível"
                onDelete={onRemoveOnlyAvailableFilterClick}
              />
            )}
          </Box>
        </div>

        <Drawer open={openFilters} onClose={handleCloseFiltersClick}>
          <Typography component="h3" variant="h3" sx={{ m: 3 }}>
            Filtros
          </Typography>
          <Box
            sx={{
              height: "100%",
              maxWidth: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
            }}
          >
            <FormControl sx={{ m: 3, minWidth: 300 }}>
              <InputLabel id="genreLabel">Gênero</InputLabel>
              <Select
                labelId="genreLabel"
                label="Gênero"
                name="genreFilter"
                id="genreFilter"
                value={genreFilter}
                onChange={onGenreFilterChange}
              >
                <MenuItem value="">Todos</MenuItem>
                {genreList.map((genre, idx) => (
                  <MenuItem key={idx} value={`&genre_eq=${genre}`}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ minWidth: 300, m: 3 }}>
              <Typography>Intervalo de preços</Typography>
              <Slider
                value={priceRange}
                onChange={onPriceRangeChange}
                min={0}
                max={2000}
              />
              <Typography>
                Min: {priceRange[0]}€ | Max: {priceRange[1]}€
              </Typography>
            </Box>
            <Box sx={{ m: 3 }}>
              <Typography>Nota Mínima</Typography>
              <Rating value={minRating} onChange={onMinRatingChange} />
            </Box>

            <FormControlLabel
              value={onlyAvailable}
              sx={{ minWidth: 300, m: 3 }}
              control={
                <Checkbox
                  checked={onlyAvailable}
                  onChange={onOnlyAvailableChange}
                />
              }
              label="Mostrar somente livros disponíveis?"
            />
            <Button
              onClick={onResetFiltersClick}
              sx={{ minWidth: 300, m: 3 }}
              variant="contained"
            >
              <RestartAlt />
              Repor Filtros
            </Button>
            <br />
          </Box>
        </Drawer>
      </form>
    </div>
  );
}
