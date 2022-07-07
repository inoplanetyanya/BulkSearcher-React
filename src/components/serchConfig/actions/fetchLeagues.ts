import axios from "axios";
import { ILeague } from "../../../models/ILeagueList";
import { leagueListSlice } from "../../../store/reducers/leagueListSlice";

export function fetchLeagues() {
  return async function (dispatch: any) {
    const leaguesURL = "https://api.pathofexile.com/leagues?type=main&realm=pc";
    const requestConfig = {
      headers: {
        "content-type": "application/json"
      },
    };

    let leagueList = await axios.get(leaguesURL, requestConfig).then((responce) => responce.data as ILeague[]);
    leagueList = leagueList.filter((el) => el.rules.filter((el) => el.description.includes("You may not party in this league.")).length < 1);
    leagueList.sort(function (a, b) {
      if (a.startAt < b.startAt) {
        return 1;
      } else if (a.startAt > b.startAt) {
        return -1;
      } else if (a.id.includes("Hardcore") && !b.id.includes("Hardcore")) {
        return 1;
      } else if (!a.id.includes("Hardcore") && b.id.includes("Hardcore")) {
        return -1;
      }
      return 0;
    });
    const setLeagueList = leagueListSlice.actions.setLeagueList;
    dispatch(setLeagueList(leagueList));
  };
}
