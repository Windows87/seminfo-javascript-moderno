async function pesquisarPokemon(evento) {
  evento.preventDefault();
  const nomeDoPokemon = document.querySelector('#search-pokemon-name').value.toLowerCase();

  if(!nomeDoPokemon)
  	return alert('Digite o Nome do Pokemon');

  try {
    const chamada = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeDoPokemon}/`);
    const dadosDoPokemon = await chamada.json();

    // Mudar os Textos
    const elementoNomeDoPokemon = document.querySelector('#pokemon-name');
    const elementoNumeroDoPokemon = document.querySelector('#pokemon-number');
    const elementoAlturaDoPokemon = document.querySelector('#pokemon-height');
    const elementoPesoDoPokemon = document.querySelector('#pokemon-weight');

    elementoNomeDoPokemon.innerText = nomeDoPokemon;
    elementoNumeroDoPokemon.innerText = `Número: ${dadosDoPokemon.id}`;
    elementoAlturaDoPokemon.innerText = `Altura: ${(dadosDoPokemon.height * 0.1).toFixed(1)}m`;
    elementoPesoDoPokemon.innerText = `Peso: ${dadosDoPokemon.weight * 0.1}kg`;

    // Mudar a Imagem
    const elementoImagemDoPokemon = document.querySelector('#pokemon-image');
    elementoImagemDoPokemon.src = dadosDoPokemon.sprites.front_default;

    // Limpar os Tipos
    const elementoListaDeTipos = document.querySelector('#pokemon-types-list');
    elementoListaDeTipos.innerHTML = '';

    // Adicionar os Tipos
    dadosDoPokemon.types.forEach(type => {
      const nomeDoTipo = type.type.name;
      const elementoTipo = document.createElement('div');
      elementoTipo.classList.add('pokemon-type');
      elementoTipo.innerText = nomeDoTipo;
      elementoListaDeTipos.appendChild(elementoTipo);
    });

    mudarCorDoSite();
  } catch(error) {
    alert('Erro ao Procurar o Pokémon');
  }
}

let corAtual = 0;

function mudarCorDoSite() {
  const cores = ['#8bc34a', '#9c27b0', '#3f51b5', '#ff5722', '#f44336'];
  const body = document.querySelector('body');
  const botaoProcurar = document.querySelector('#search-pokemon-button');
  const tiposDoPokemon = document.querySelectorAll('.pokemon-type');

  corAtual++;

  if(corAtual >= cores.length)
  	corAtual = 0;

  body.style['background-color'] = cores[corAtual];
  botaoProcurar.style['background-color'] = cores[corAtual];

  tiposDoPokemon.forEach(tipoDoPokemon => {
    tipoDoPokemon.style['background-color'] = cores[corAtual];
  });
}

document.querySelector('form').addEventListener('submit', pesquisarPokemon);