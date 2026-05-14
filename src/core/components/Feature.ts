import { createElement, AnuElement, Props } from '../elements';
import { createContext } from './Context';

type FeaturesMap = Record<string, boolean>;

const defaultFeatures: FeaturesMap = {};

const FeaturesContext = createContext<{ features?: FeaturesMap }>(defaultFeatures as any);

export interface FeatureProviderProps extends Props {
    features: FeaturesMap;
    children?: AnuElement[];
}

export interface FeatureToggleProps extends Props {
    name: string;
    defaultComponent?: AnuElement | null;
    children?: AnuElement[];
}

const FeatureToggle = ({ name, children, defaultComponent = null }: FeatureToggleProps): AnuElement =>
    createElement(
        FeaturesContext.ContextConsumer,
        {},
        ({ value: { features } }: { value: { features?: FeaturesMap } }) =>
            features && features[name] === true ? children : defaultComponent
    );

const Feature = {
    Provider: FeaturesContext.ContextProvider,
    Toggle: FeatureToggle
};

export default Feature;
