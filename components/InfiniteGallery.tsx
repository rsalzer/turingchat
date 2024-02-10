"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

type InfiniteGallleryProps = {
  data: string[];
  baseUrl: string;
};

const InfiniteGalllery = ({ data, baseUrl }: InfiniteGallleryProps) => {
  const itemsPerPage = Math.min(data.length, 100);
  const [hasMore, setHasMore] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const showItems = (posts: string[]) => {
    const items = [];
    for (let i = 0; i < records; i++) {
      const item = posts[i];
      items.push(
        <div key={item}>
          <div className="min-w-[300px] max-w-full bg-rosa aspect-square">
            <img
              src={`${baseUrl}/${item}`}
              key={item}
              alt={item}
              loading={"lazy"}
            />
          </div>
          <div className="text-center">
            {item &&
              (item.startsWith("v2")
                ? item.substring(5, 15)
                : item.substring(2, 12))}
          </div>
        </div>
      );
    }
    return items;
  };
  const loadMore = () => {
    console.log("LOAD MORE");
    console.log("Records", records);
    console.log("Data length", data.length);
    if (records === data.length) {
      setHasMore(false);
    } else {
      setRecords(records + itemsPerPage);
    }
  };
  return (
    <div className="overflow-y-scroll">
      <InfiniteScroll
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2  flex-1"
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <h4 className="loader" key={"gugus"}>
            Loading...
          </h4>
        }
        useWindow={false}
      >
        {showItems(data)}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteGalllery;
