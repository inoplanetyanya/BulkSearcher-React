import axios from "axios";
import { IGetResponse, IResultItem } from "../models/IGetResponse";
import { IPriceRange } from "../models/IPriceRange";
import { ISearchConfig } from "../models/ISearchConfig";
import { BlightType } from "../store/reducers/blightTypeSlice";
import { lotListSlice } from "../store/reducers/lotListSlice";
import { searchingSlice } from "../store/reducers/searchingSlice";

export function fetchMaps(searchConfig: ISearchConfig) {
  return async function (dispatch: any) {
    const league = searchConfig.league;
    const tierRange = searchConfig.tierRange;
    const priceRange = searchConfig.priceRange;
    const blightType = searchConfig.blightType;

    let delaysGet: Promise<any>[] = [];
    let delaysPost: Promise<any>[] = [];

    let itemList: IResultItem[] = [];

    const setTiers = searchingSlice.actions.setTiers;
    const setSearchingStatus = searchingSlice.actions.setSearchingStatus;

    for (let i = tierRange.min; i <= tierRange.max; i++) {
      dispatch(setTiers({ current: i, max: tierRange.max }));
      let postBody = createPostBody(blightType, i, priceRange);
      const postResult = await makePOST(delaysPost, league, postBody, dispatch);
      await makeGETs(delaysGet, postResult.result, postResult.id, dispatch)
        .then((getResult) => {
          getResult.map((el) => {
            itemList.push(...el.result);
            return true;
          });
        })
        .catch((err) => {
          console.error("GET Error", err);
          dispatch(setSearchingStatus(false));
        });
    }

    const processItems = lotListSlice.actions.processItems;
    dispatch(processItems(itemList));
    dispatch(setSearchingStatus(false));
  };
}

enum DelayType {
  POST,
  GET,
}

async function makePOST(delays: Promise<any>[], league: string, body: object, dispatch: any) {
  const leaguesURL = `https://www.pathofexile.com/api/trade/search/${league}`;
  const requestConfig = {
    headers: {
      "content-type": "application/json",
    },
  };

  const setDelay = searchingSlice.actions.setDelayPOST;

  await Promise.all(delays).then(() => {
    dispatch(setDelay(0));
    delays.length = 0;
  });

  return await axios
    .post(leaguesURL, body, requestConfig)
    .then((response) => {
      const responseData = response.data;
      const limit = response.headers["x-rate-limit-ip"];
      const state = response.headers["x-rate-limit-ip-state"];

      limitRequest(limit ? limit : "", state ? state : "", delays, DelayType.POST, dispatch);

      return responseData;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("POST Error");
    });
}

async function makeGETs(delays: Promise<any>[], requestIDs: string[], queryID: string, dispatch: any) {
  const setTierProgress = searchingSlice.actions.setTierProgress;
  const setDelay = searchingSlice.actions.setDelayGET;

  let iterationCurrent = 0;
  const iterationMax = Math.ceil(requestIDs.length / 9);

  const result: IGetResponse[] = [];
  let splisedReqIDs = requestIDs.splice(0, 9);

  while (splisedReqIDs.length) {
    iterationCurrent++;
    dispatch(setTierProgress({ current: iterationCurrent, max: iterationMax }));

    const stringInjection = splisedReqIDs.join(",") + `?query=${queryID}`;
    const url = `https://www.pathofexile.com/api/trade/fetch/${stringInjection}`;

    await Promise.all(delays).then(() => {
      dispatch(setDelay(0));
      delays.length = 0;
    });

    const requestConfig = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .get(url, requestConfig)
      .then((response) => {
        const responseData: IGetResponse = response.data;
        result.push(responseData);
        const limit = response.headers["x-rate-limit-ip"];
        const state = response.headers["x-rate-limit-ip-state"];

        limitRequest(limit ? limit : "", state ? state : "", delays, DelayType.GET, dispatch);
      })
      .catch((err) => {
        console.error(err);
        throw new Error("GET Error");
      });

    splisedReqIDs = requestIDs.splice(0, 9);
  }

  return result;
}

function limitRequest(limit: string, state: string, delays: Promise<any>[], delayType: DelayType, dispatch: any) {
  const limitSplited = limit.split(",");
  const limits = [];
  for (let i = 0; i < limitSplited.length; i++) {
    limits.push(limitSplited[i].split(":")[0]);
  }

  const stateSplited = state.split(",");
  const states = [];
  for (let i = 0; i < stateSplited.length; i++) {
    states.push(stateSplited[i].split(":")[0]);
  }

  for (let i = 0; i < limits.length; i++) {
    if (states[i] === limits[i]) {
      const delay = Number(limitSplited[i].split(":")[1]);
      delays.push(getDelay(delay));

      const setDelay = delayType === DelayType.GET ? searchingSlice.actions.setDelayGET : searchingSlice.actions.setDelayPOST;

      dispatch(setDelay(delay));
    }
  }
}

function getDelay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${seconds} seconds passed`);
    }, seconds * 1000);
  });
}

function createPostBody(blightType: BlightType, tier: number, priceRange: IPriceRange): object {
  return {
    query: {
      status: {
        option: "online",
      },
      stats: [
        {
          type: "and",
          filters: [],
        },
      ],
      filters: {
        map_filters: {
          filters: {
            map_uberblighted: {
              option: blightType === BlightType.uberblighted ? "true" : "false",
            },
            map_blighted: {
              option: blightType === BlightType.blighted ? "true" : "false",
            },
            map_tier: {
              min: tier,
              max: tier,
            },
          },
        },
        trade_filters: {
          filters: {
            price: {
              min: priceRange.min === undefined ? priceRange.min : 0.1,
              max: priceRange.max === undefined ? priceRange.max : 99999,
            },
          },
        },
        misc_filters: {
          filters: {
            corrupted: {
              option: "false",
            },
            enchanted: {
              option: "false",
            },
            split: {
              option: "false",
            },
            mirrored: {
              option: "false",
            },
            crafted: {
              option: "false",
            },
            fractured_item: {
              option: "false",
            },
          },
        },
      },
    },
    sort: {
      price: "asc",
    },
  };
}
