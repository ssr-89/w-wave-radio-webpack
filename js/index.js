import { headerSearch } from "../node_modules/search.js";

const searchForm = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

headerSearch(searchBtn, searchForm, searchInput);
