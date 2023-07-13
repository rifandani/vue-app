<script lang="ts">
  import Icon from '@iconify/svelte';
  import axios from 'redaxios';

  let pokemon = '1';
  let evos = ['3'];
  $: pokemons = [(Number(pokemon) + 1).toString(), (Number(pokemon) + 2).toString()];
  $: pokemonPromise = getPokemon(pokemon);
  $: evosPromises = getEvos(evos);

  async function getPokemon(_pokemon: string) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${_pokemon}`);

    if (res.status !== 200) {
      throw new Error(res.data);
    } else {
      return res.data;
    }
  }
  async function getEvos(_pokemons: string[]) {
    const res = await Promise.allSettled(
      _pokemons.map((_pokemon) => axios.get(`https://pokeapi.co/api/v2/pokemon/${_pokemon}`)),
    );
    return res;
  }
</script>

<section
  class="card bg-secondary text-secondary-content w-full rounded-lg border p-5 shadow-lg flex flex-col items-center"
>
  <div class="form-control">
    <p class="text-lg text-secondary-content mb-3">Choose your starter pokemon:</p>

    <label class="label cursor-pointer">
      <span class="label-text text-secondary-content mr-5">Bulbasaur</span>
      <input
        class="radio checked:bg-green-500"
        type="radio"
        name="bulbasaur"
        id="bulbasaur"
        bind:group={pokemon}
        value="1"
      />
    </label>
    <label class="label cursor-pointer">
      <span class="label-text text-secondary-content mr-5">Charmender</span>
      <input
        class="radio checked:bg-red-500"
        type="radio"
        name="charmender"
        id="charmender"
        bind:group={pokemon}
        value="4"
      />
    </label>
    <label class="label cursor-pointer">
      <span class="label-text text-secondary-content mr-5">Squirtle</span>
      <input
        class="radio checked:bg-blue-500"
        type="radio"
        name="squirtle"
        id="squirtle"
        bind:group={pokemon}
        value="7"
      />
    </label>
  </div>

  {#await pokemonPromise}
    <Icon icon="svg-spinners:bouncing-ball" height="5em" class="text-primary" />
  {:then ditto}
    <img
      src={ditto.sprites.other['official-artwork'].front_default}
      alt={ditto.species.name}
      class="w-32 h-32"
    />
    <p class="">{ditto.species.name}</p>
  {:catch error}
    <p class="text-error">{error.message}</p>
  {/await}

  <div class="form-control mt-10">
    <p class="text-lg text-secondary-content mb-3">Pick your evolutions:</p>

    {#each pokemons as poke}
      <label class="label cursor-pointer">
        <span class="label-text text-secondary-content mr-5">{poke.toLocaleUpperCase()}</span>
        <input
          class="checkbox checked:bg-primary-500"
          type="checkbox"
          name={poke}
          id={poke}
          bind:group={evos}
          value={poke}
        />
      </label>
    {/each}
  </div>

  {#await evosPromises}
    <Icon icon="svg-spinners:wind-toy" height="5em" class="text-primary" />
  {:then evos}
    {#each evos as evo}
      {#if evo.status === 'fulfilled'}
        <img
          src={evo.value.data.sprites.other['official-artwork'].front_default}
          alt={evo.value.data.species.name}
          class="w-32 h-32"
        />
        <p class="">{evo.value.data.species.name}</p>
      {/if}
    {/each}
  {:catch error}
    <p class="text-error">{error.message}</p>
  {/await}
</section>
