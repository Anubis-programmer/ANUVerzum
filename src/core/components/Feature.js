import { createElement } from '../elements';
import { createContext } from './Context';

const defaultFeatures = {};

const FeaturesContext = createContext(defaultFeatures);

const FeatureToggle = ({ name, children, defaultComponent = null }) => createElement(
    FeaturesContext.ContextConsumer,
    {},
    ({ value: { features } }) => (
        features[name] === true ?
            children :
            defaultComponent
    )
);

const Feature = {
    Provider: FeaturesContext.ContextProvider,
    Toggle: FeatureToggle,
};

export default Feature;