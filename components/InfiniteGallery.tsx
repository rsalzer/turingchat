"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ExperimentType } from "@/components/Experiment";
import Button from "@/components/Button";

export type Gallery = {
  key: string;
  value: string;
  revisedPrompt: string;
  prompt: string;
};

type InfiniteGallleryProps = {
  data: Gallery[];
  baseUrl: string;
  experiment: ExperimentType | undefined;
  showAdmin: boolean;
};

const InfiniteGalllery = ({
  data,
  baseUrl,
  experiment,
  showAdmin,
}: InfiniteGallleryProps) => {
  const itemsPerPage = Math.min(data.length, 100);
  const [hasMore, setHasMore] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const reclassifyImage = async (
    experiment: string,
    key: string,
    value: string
  ) => {
    try {
      const response = await fetch("/api/classifyimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiment: experiment,
          key: key,
          value: value,
          reclassify: true,
        }),
      });
      await response.json();
      console.log("Successfully classified");
    } catch (e) {
      console.log("Classification failed");
    }
  };

  const showItems = (posts: Gallery[]) => {
    const items = [];
    for (let i = 0; i < records; i++) {
      const item = posts[i];
      if (item) {
        items.push(
          <div key={item.key}>
            <div className="min-w-[300px] max-w-full bg-rosa aspect-square relative group">
              <img
                src={`${baseUrl}/${item?.key.replace("i_", "")}`}
                key={item.key}
                alt={item.key}
                loading={"lazy"}
              />
              {item.value && !item.value.startsWith("0_") && (
                <div className="absolute top-0 right-0 backdrop-brightness-50 text-white text-xs ps-2 pe-2 pt-1 pb-1">
                  {item.value.split("_")[0]}
                </div>
              )}
              {showAdmin && (
                <div className="absolute inset-0 text-xs invisible text-white backdrop-brightness-[40%] p-1 group-hover:visible">
                  <div>{item.prompt}</div>
                  <br />
                  {item.prompt != item.revisedPrompt && (
                    <div>{item.revisedPrompt}</div>
                  )}
                  {experiment && (
                    <div>
                      <Button
                        onClick={() => {
                          reclassifyImage(
                            experiment.name,
                            item.key.replace("i_", ""),
                            experiment.words[0]
                          );
                        }}
                      >
                        {experiment.words[0]}
                      </Button>
                      <Button
                        onClick={() => {
                          reclassifyImage(
                            experiment.name,
                            item.key.replace("i_", ""),
                            experiment.words[1]
                          );
                        }}
                      >
                        {experiment.words[1]}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="text-center">
              {item.key &&
                (item.key.startsWith("i_v2")
                  ? item.key.substring(7, 27)
                  : item.key.substring(2, 12))}
            </div>
          </div>
        );
      }
    }
    return items;
  };
  const loadMore = () => {
    console.log("LOAD MORE");
    console.log("Records", records);
    console.log("Data length", data.length);
    if (records >= data.length) {
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
