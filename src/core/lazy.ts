import { Component } from './components/Component';
import { createElement, AnuElement, ElementType, Props } from './elements';

export interface LazyOptions {
    fallback?: AnuElement | null;
    onError?: (error: unknown) => void;
}

export const lazy = (
    factory: () => Promise<{ default: ElementType } | ElementType>,
    options: LazyOptions = {}
): ElementType =>
    class Lazy extends Component<Props, { Loaded: ElementType | null }> {
        state = { Loaded: null as ElementType | null };

        componentDidMount(): void {
            Promise.resolve()
                .then(factory)
                .then((mod) => {
                    const Loaded = (mod as { default: ElementType }).default ?? (mod as ElementType);
                    this.setState({ Loaded });
                })
                .catch((error) => {
                    options.onError?.(error);
                });
        }

        render(): AnuElement | null {
            const { Loaded } = this.state;

            if (Loaded === null) {
                return options.fallback ?? null;
            }

            return createElement(Loaded, this.props);
        }
    };
