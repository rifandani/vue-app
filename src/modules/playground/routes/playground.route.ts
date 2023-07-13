import type { RouteDefinition } from 'svelte-spa-router';
import wrap from 'svelte-spa-router/wrap';
import PlaygroundLoading from '../pages/Playground.loading.svelte';

export const playgroundRoute: RouteDefinition = {
  // exact path, lazy loaded
  '/playground': wrap({
    asyncComponent: () => import('../pages/Playground.page.svelte'),
    loadingComponent: PlaygroundLoading,
  }),
};
