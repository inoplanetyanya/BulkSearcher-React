import axios from "axios";
import { IGetResponse, IResultItem } from "../models/IGetResponse";
import { IPostResponse } from "../models/IPostResponse";
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
      await dispatch(setTiers({ current: i, max: tierRange.max }));
      let postBody = createPostBody(blightType, i, priceRange);
      let postResult = await makePOST(delaysPost, league, postBody, dispatch);
      let getResult = await makeGETs(delaysGet, postResult.result, postResult.id, dispatch);
      getResult?.map((el) => {
        itemList.push(...el.result);
        return true;
      });
    }

    await dispatch(setSearchingStatus(false));

    const processItems = lotListSlice.actions.processItems;
    await dispatch(processItems(itemList));
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

  const setDelay = searchingSlice.actions.setDelay;

  await Promise.all(delays);
  await dispatch(setDelay(0));
  delays = [];

  let response;
  let responseData: IPostResponse;
  try {
    response = await axios.post(leaguesURL, body, requestConfig);
    responseData = await response.data;
  } catch {
    return {result: [], id: ""};
  }

  const limit = await response.headers["x-rate-limit-ip"];
  const state = await response.headers["x-rate-limit-ip-state"];

  await limitRequest(limit ? limit : "", state ? state : "", delays, DelayType.POST, dispatch);

  return responseData;
}

async function makeGETs(delays: Promise<any>[], requestIDs: string[], queryID: string, dispatch: any) {
  if (!requestIDs || !queryID) return;

  const setTierProgress = searchingSlice.actions.setTierProgress;
  const setDelay = searchingSlice.actions.setDelay;

  let iterationCurrent = 0;
  const iterationMax = Math.ceil(requestIDs.length / 9);

  const result: IGetResponse[] = [];
  let splisedReqIDs = requestIDs.splice(0, 9);

  while (splisedReqIDs.length) {
    iterationCurrent++;
    await dispatch(setTierProgress({ current: iterationCurrent, max: iterationMax }));

    await Promise.all(delays);
    await dispatch(setDelay(0));
    delays = [];

    const requestConfig = {
      headers: {
        "content-type": "application/json",
      },
    };

    const stringInjection = splisedReqIDs.join(",") + `?query=${queryID}`;
    const url = `https://www.pathofexile.com/api/trade/fetch/${stringInjection}`;

    let response;
    try {
      response = await axios.get(url, requestConfig);
    } catch {
      return result;
    }
    const responseData: IGetResponse = await response.data;
    result.push(responseData);

    if (response) {
      const limit = await response.headers["x-rate-limit-ip"];
      const state = await response.headers["x-rate-limit-ip-state"];

      await limitRequest(limit ? limit : "", state ? state : "", delays, DelayType.GET, dispatch);
    }
    splisedReqIDs = requestIDs.splice(0, 9);
  }

  return result;
}

async function limitRequest(limit: string, state: string, delays: Promise<any>[], delayType: DelayType, dispatch: any) {
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

  const setDelay = searchingSlice.actions.setDelay;

  for (let i = 0; i < limits.length; i++) {
    if (states[i] === limits[i]) {
      if (delayType === DelayType.POST) {
        const delay = Number(limitSplited[i].split(":")[1]);
        await delays.push(getDelay(delay));
        await dispatch(setDelay(delay));
      } else if (delayType === DelayType.GET) {
        const delay = Number(limitSplited[i].split(":")[1]);
        await delays.push(getDelay(delay));
        await dispatch(setDelay(delay));
      }
    }
  }
}

function getDelay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("OK");
    }, seconds * 1000);
  });
}

function createPostBody(blightType: BlightType, tier: number, priceRange: IPriceRange): object {
  const result = {
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
  return result;
}
