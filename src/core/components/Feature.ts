import { createElement, AnuElement, Props } from '../elements';
import { Component } from './Component';
import { createContext } from './Context';
import { Fragment } from './Fragment';

type FeaturesMap = Record<string, boolean>;

const defaultFeatures: FeaturesMap = {};

const FeaturesContext = createContext<{ features?: FeaturesMap }>(defaultFeatures as any);

export interface FeatureProviderProps extends Props {
    features: FeaturesMap;
}

export interface FeatureToggleProps extends Props {
    name: string;
    defaultComponent?: AnuElement | AnuElement[] | null;
}

const resolveDefault = (defaultComponent: AnuElement | AnuElement[] | null): AnuElement | AnuElement[] | null => {
    if (defaultComponent && !Array.isArray(defaultComponent) && (defaultComponent as AnuElement).type === Fragment) {
        return ((defaultComponent as AnuElement).props.children as AnuElement[]) ?? null;
    }
    
    return defaultComponent;
};

class FeatureToggle extends Component<FeatureToggleProps> {
    render(): AnuElement {
        return createElement(
            FeaturesContext.ContextConsumer,
            {},
            ({ value: { features } }: { value: { features?: FeaturesMap } }) =>
                features && features[this.props.name] === true
                    ? this.props.children
                    : resolveDefault(this.props.defaultComponent ?? null)
        );
    }
}

const Feature = {
    Provider: FeaturesContext.ContextProvider,
    Toggle: FeatureToggle
};

export default Feature;
