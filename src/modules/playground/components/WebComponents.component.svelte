<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import {
    myCounterEventDecrement,
    myCounterEventIncrement,
    type MyCounterEventDetail,
  } from '../../../lib/wc/MyCounter.constant';
  import '../../../lib/wc/MyCounter.wc.svelte';

  let sectionRef: HTMLElement;
  let initialCount = '10';

  const handleClickTambah: HTMLButtonAttributes['on:click'] = () => {
    initialCount = (Number(initialCount) + 1).toString();
  };

  const onDecrement = (ev: CustomEvent<MyCounterEventDetail>) => {
    initialCount = ev.detail.count;
  };
  const onIncrement = (ev: CustomEvent<MyCounterEventDetail>) => {
    initialCount = ev.detail.count;
  };

  onMount(() => {
    sectionRef.addEventListener(myCounterEventDecrement, onDecrement);
    sectionRef.addEventListener(myCounterEventIncrement, onIncrement);
  });

  onDestroy(() => {
    sectionRef.removeEventListener(myCounterEventDecrement, onDecrement);
    sectionRef.removeEventListener(myCounterEventIncrement, onIncrement);
  });
</script>

<section
  class="card bg-secondary text-secondary-content w-full rounded-lg border p-5 shadow-lg flex flex-col space-y-3 items-center"
  bind:this={sectionRef}
>
  <button class="btn btn-xs btn-info" on:click={handleClickTambah}>Tambah</button>

  <my-counter {initialCount} />
</section>
