import { SERVER_START_REQ, SERVER_START_OK, SERVER_START_ERR,
         UPDATE_ARGS, SWITCH_TAB } from '../actions/StartServer';

import { ipcRenderer } from 'electron';

export const DEFAULT_ARGS = ipcRenderer.sendSync('get-default-args');
export const ARG_DATA = ipcRenderer.sendSync('get-args-metadata');

const initialState = {
  serverArgs: {...DEFAULT_ARGS},
  serverStarting: false,
  serverFailMsg: "",
  tabId: 0,
};

export default function startServer (state = initialState, action) {
  switch (action.type) {
    case SERVER_START_REQ:
      return {...state, serverStarting: true};
    case SERVER_START_OK:
    case SERVER_START_ERR:
      return {
        ...state,
        serverStarting: false,
      };
    case UPDATE_ARGS:
      return {
        ...state,
        serverArgs: Object.assign({}, state.serverArgs, action.args)
      };
    case SWITCH_TAB:
      return {
        ...state,
        tabId: action.tabId
      };
    default:
      return state;
  }
}
