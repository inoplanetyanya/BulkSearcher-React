import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResultItem } from "../../models/IGetResponse";
import { ILot } from "../../models/ILot";
import { IMap } from "../../models/IMap";

interface LotListState {
  lots: ILot[];
}

const initialState: LotListState = {
  lots: [],
};

export const lotListSlice = createSlice({
  name: "LotList",
  initialState,
  reducers: {
    setLotList(state: LotListState, action: PayloadAction<ILot[]>) {
      state.lots = action.payload;
    },
    processItems(state: LotListState, action: PayloadAction<IResultItem[]>) {
      state.lots = [];

      const checkedSellers: string[] = [];

      action.payload.map((lot) => {
        const sellerCharacter = lot.listing.account.lastCharacterName;
        const sellerAccount = lot.listing.account.name;
        const clicked = false;

        const maps: IMap[] = [];

        function addMap(map: any) {
          const finded = maps.find((el) => el.name === map.name && el.tier === map.tier && el.price === map.price);
          if (finded) {
            finded.count++;
            finded.pickedCount++;
          } else {
            maps.push({ name: map.name, tier: map.tier, price: map.price, count: 1, pickedCount: 1, iconURL: map.iconURL });
          }
        }

        action.payload
          .filter((el) => el.listing.account.name === sellerAccount && !checkedSellers.includes(sellerAccount))
          .map((el) => {
            const map = { name: el.item.baseType, tier: Number(el.item.properties[0]["values"][0][0]), price: el.listing.price.amount, iconURL: el.item.icon };
            addMap(map);
            return true;
          });

        checkedSellers.push(sellerAccount);

        const message = "";

        let totalPrice = 0;
        let totalMaps = 0;
        maps.map((el) => {
          totalPrice += el.price * el.count;
          totalMaps += el.count;
          return true;
        });

        let averagePrice = totalPrice / totalMaps;

        if (averagePrice) state.lots.push({ sellerCharacter, sellerAccount, maps, averagePrice, message, clicked, totalMaps });
        return true;
      });

      state.lots.sort(function (a, b) {
        if (a.averagePrice > b.averagePrice) {
          return 1;
        }
        if (a.averagePrice < b.averagePrice) {
          return -1;
        }
        return 0;
      });
    },
    mapMinus(state: LotListState, action: PayloadAction<{ sellerCharacter: string; map: IMap }>) {
      const sellerCharacter = action.payload.sellerCharacter;
      const map = action.payload.map;

      const lotFound = state.lots.find((el) => el.sellerCharacter === sellerCharacter);
      const mapFound = lotFound?.maps.find((el) => el.name === map.name && el.tier === map.tier && el.price === map.price);

      if (mapFound) {
        mapFound.pickedCount--;
      }
    },
    mapPlus(state: LotListState, action: PayloadAction<{ sellerCharacter: string; map: IMap }>) {
      const sellerCharacter = action.payload.sellerCharacter;
      const map = action.payload.map;

      const lotFound = state.lots.find((el) => el.sellerCharacter === sellerCharacter);
      const mapFound = lotFound?.maps.find((el) => el.name === map.name && el.tier === map.tier && el.price === map.price);

      if (mapFound) {
        mapFound.pickedCount++;
      }
    },
    setCicked(state: LotListState, action: PayloadAction<{ lot: ILot }>) {
      const lot = action.payload.lot;

      if (!action.payload.lot.clicked) {
        const lotFound = state.lots.find((el) => JSON.stringify(el) === JSON.stringify(lot));
        if (lotFound) {
          lotFound.clicked = true;
        }
      }
    },
    setMessage(state: LotListState, action: PayloadAction<{ lot: ILot; message: string }>) {
      const lot = action.payload.lot;

      const lotFound = state.lots.find((el) => el.sellerCharacter === lot.sellerCharacter);
      if (lotFound) {
        lotFound.message = action.payload.message;
      }
    },
  },
});

export default lotListSlice.reducer;
