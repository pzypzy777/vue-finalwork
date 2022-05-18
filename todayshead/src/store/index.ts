import { defineStore } from 'pinia'
import { toHandlers } from 'vue'


export const userStore = defineStore({
  id: '1',
  state: () => {
    return {
      user_name: "",
      user_id: '',
      user_pwd: '',
      follow: 0,
      fans: 0,
      toutiao: 0,
      zan: 0,
      searchHistoryList: []
    }
  },

  getters: {

  },

  actions: {
    addSearchHistory(e){
      if(this.searchHistoryList.indexOf(e)===-1){
        this.searchHistoryList.push(e);
      }
    },
    clearSearchHistory(e){
      this.searchHistoryList.length = 0;;
    }
  },


})
