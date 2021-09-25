import { ComponentChildren, ComponentType, VNode } from "preact";
import { DefaultParams, Params, RouteComponentProps, RouteProps } from "wouter-preact";

export interface INestedRouteProps<T extends DefaultParams = DefaultParams> {
  base?: string
  children?: ((params: Params<T>) => ComponentChildren) | ComponentChildren;
  // children: VNode<RouteProps<DefaultParams>>
  component?: ComponentType<RouteComponentProps<T>>;
}