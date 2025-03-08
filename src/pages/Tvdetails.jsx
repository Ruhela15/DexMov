import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadTv } from "../store/actions/TvActions";
import { removeTv } from "../store/reducers/TvSlice";
import Loading from "../components/Loading";
import HorizontalCards from "../components/partial/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.Tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [dispatch, id]);

  const renderWatchProviders = (type, title) => {
    const providers = info.watchProviders?.[type];
    if (providers?.length > 0) {
      return (
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <div className="flex flex-wrap gap-4">
            {providers.map((provider, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-[5vh] h-[5vh] rounded-md object-cover"
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                />
                <span className="text-xs text-white mt-1">
                  {provider.provider_name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSeasons = () => {
    if (info.detail.seasons?.length > 0) {
      return (
        <div className="mt-10">
          <h3 className="text-white text-lg font-semibold mb-4">Seasons</h3>
          <div className="flex flex-wrap gap-4">
            {info.detail.seasons.map((season) => (
              <div
                key={season.id}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`${pathname}/season/${season.season_number}`)}
              >
                <img
                  className="w-[10vh] h-[15vh] rounded-md object-cover mb-2"
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={season.name}
                />
                <span className="text-sm text-white">{season.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="absolute w-screen h-screen px-[10%] py-10 overflow-auto"
    >
      {/* Navigation */}
      <nav className="w-full flex items-center gap-8 text-xl text-white mb-8">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-red-500 ri-arrow-left-line cursor-pointer"
        ></Link>
        <a
          target="_blank"
          href={info.detail.homepage}
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          <i className="ri-links-line"></i>
        </a>
        <a
          target="_blank"
          href="https://www.themoviedb.org/"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          <i className="ri-global-fill"></i>
        </a>
        {info.externalIds?.imdb_id && (
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalIds.imdb_id}/`}
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* Content */}
      <div className="flex flex-wrap gap-8">
        {/* Image Section */}
        <img
          className="shadow-lg h-[50vh] w-[30%] rounded-lg object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path}`}
          alt="TV Backdrop"
        />

        {/* Details Section */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {info.detail.name || "TV Show Title"}
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            First Aired: {info.detail.first_air_date?.split("-")[0]}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lg font-semibold bg-yellow-400 text-black px-4 py-2 rounded-full">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <span className="text-sm text-gray-300">
              {info.detail.vote_count} Votes
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-6">{info.detail.overview}</p>
          <Link
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg inline-flex items-center gap-2"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-line"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      <div className="mt-10">
        {renderWatchProviders("flatrate", "Streaming Providers")}
        {renderWatchProviders("rent", "Rent Providers")}
        {renderWatchProviders("buy", "Buy Providers")}
      </div>

      {/* Seasons */}
      {renderSeasons()}

      {/* Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-200 " />
      <h1 className="text-red-700 font-extrabold text-3xl mt-5 mb-5">
        Recommendations Similar Stuff
      </h1>
      <HorizontalCards
        data={info.recommendations.length > 0 ? info.recommendations : info.similar}
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;

