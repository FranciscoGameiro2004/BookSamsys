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
} from "@mui/material";

import {
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
  ChangeEvent,
  FormEvent,
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
}: BookSearchProps) {
  return (
    <div>
      <form action="#" onSubmit={onFormSubmit}>
        <TextField
          value={search}
          label="Pesquisar"
          id="search"
          onChange={onSearchChange}
        />
        <FormControl sx={{ m: 1, minWidth: 150 }}>
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
        <FormControl>
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
        <label htmlFor="">Filtros</label>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
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
            {genreList.map((genre) => (
              <MenuItem value={`&genre_eq=${genre}`}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ width: 400, m: 2 }}>
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
        <Box>
          <Typography>Nota Mínima</Typography>
          <Rating value={minRating} onChange={onMinRatingChange} />
        </Box>

        <FormControlLabel
          control={
            <Checkbox value={onlyAvailable} onChange={onOnlyAvailableChange} />
          }
          label="Somente os disponíveis?"
        />
        <br />
        <Button type="submit" variant="contained">
          Procurar
        </Button>
      </form>
    </div>
  );
}
