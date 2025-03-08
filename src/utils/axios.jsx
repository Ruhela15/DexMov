import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjYxZTI0YWJkNzBlZDE2YTZiODM1ZDIwNWI0YzQ2YSIsIm5iZiI6MTczMTU3MTc3OS40OTYsInN1YiI6IjY3MzViMDQzZDRmZmJhMWU4YjJhZGIzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gwfnhLJ0bbgiZo5VGiuDxVmEwimZFA5WkHLwzX-mvE4",
  },
});
export default instance;