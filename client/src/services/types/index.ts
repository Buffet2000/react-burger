import { CurrentOrderActions } from "../actions/current-order";
import { OpenedIngredientInfoActions } from "../actions/opened-ingredient-info";
import { IngrediensConstructorActions } from "../actions/constructor-ingredients";
import { IngredientsDataActions } from "../actions/all-ingredients";
import { LoginActions } from "../actions/login";
import { OrderActions } from "../actions/order";
import { ResetPasswordActions } from "../actions/reset-password";
import { WsActions } from "../actions/web-socket";
import { WsAuthActions } from "../actions/web-socket-auth";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { rootReducer } from "../reducers/root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

type ApplicationActions =
  | CurrentOrderActions
  | OpenedIngredientInfoActions
  | IngrediensConstructorActions
  | IngredientsDataActions
  | LoginActions
  | OrderActions
  | ResetPasswordActions
  | WsActions
  | WsAuthActions
;

// Redux Thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, ApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 