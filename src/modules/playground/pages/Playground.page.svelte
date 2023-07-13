<script lang="ts">
  import AwaitBlock from '../components/AwaitBlock.component.svelte';
  import WebComponents from '../components/WebComponents.component.svelte';
</script>

<main
  class="min-h-screen flex flex-col space-y-5 items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52"
>
  <h1 data-testid="title" class="text-primary-content mb-10 text-2xl font-semibold tracking-wider">
    Playground
  </h1>

  <AwaitBlock />

  <WebComponents />
</main>
