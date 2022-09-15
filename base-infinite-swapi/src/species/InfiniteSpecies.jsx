import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => {
      return fetchUrl(pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  console.log("data", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <>
      {isFetching && <div>Fetching...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((page) => {
          return page.results.map((el) => {
            return (
              <Species
                key={el.name}
                name={el.name}
                language={el.language}
                averageLifespan={el.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
