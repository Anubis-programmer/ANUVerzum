import { createElement, AnuElement, Props } from '../elements';
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

const FeatureToggle = ({ name, children, defaultComponent = null }: FeatureToggleProps): AnuElement =>
    createElement(
        FeaturesContext.ContextConsumer,
        {},
        ({ value: { features } }: { value: { features?: FeaturesMap } }) =>
            features && features[name] === true ? children : resolveDefault(defaultComponent)
    );

const Feature = {
    Provider: FeaturesContext.ContextProvider,
    Toggle: FeatureToggle
};

export default Feature;
