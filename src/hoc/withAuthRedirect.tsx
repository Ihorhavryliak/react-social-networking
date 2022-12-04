import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";


const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
} as  MapPropsType) 

type MapPropsType = {
  isAuth: boolean
}
type DispatchType = {

}


export function withAuthRedirect <WCP extends Record<string, unknown>> (WrappComponent: React.ComponentType<WCP>) {

  function RedirectComponent(props: DispatchType & MapPropsType)  {
    let {isAuth, ...restProps} = props
      if (!props.isAuth) { return <Navigate to={'/login'} /> }
      return (

        <WrappComponent {...restProps as WCP} />
      )
   }
   //<TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>): InferableComponentEnhancerWithProps<TStateProps & DispatchProp, TOwnProps>;
  let ConnectedAuthRedirectComponent = 
  connect<MapPropsType, DispatchType, WCP, AppStateType >(mapStateToPropsForRedirect, 
    {})(RedirectComponent)

  return ConnectedAuthRedirectComponent;
}