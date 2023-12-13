/**
 * 2C = Two of Clubs(Tréboles)
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = two of Spades
 */

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

// Referencias del HTML
let puntoJugador = 0,
  puntosComputadora = 0
const puntosHTML = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')

//Esta funcion crea un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo)
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo)
    }
  }
  deck = _.shuffle(deck)
  console.log(deck)

  return deck
}

crearDeck()

// Esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck'
  }
  const carta = deck.pop()

  return carta
}

pedirCarta()

const valorCarta = carta => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1
}

// turno de la computadora
const turnoComputador = puntoMinimo => {
  do {
    const carta = pedirCarta()
    puntosComputadora = puntosComputadora + valorCarta(carta)
    puntosHTML[1].innerText = `${puntosComputadora}`

    const imgCarta = document.createElement('img')
    imgCarta.classList.add('carta')
    imgCarta.src = `assets/cartas/${carta}.png`
    divCartasComputadora.append(imgCarta)

    if (puntoMinimo > 21) {
      break
    }
  } while (puntosComputadora < puntoMinimo && puntoMinimo <= 21)

  setTimeout(() => {
    if (puntosComputadora === puntoMinimo) {
      alert('Nadie gana :( ')
    } else if (puntoMinimo > 21) {
      alert('Computadora gana')
    } else if (puntosComputadora > 21) {
      alert('Jugador Gana')
    } else {
      alert('Computadora Gana')
    }
  }, 100)
}

// Evenntos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta()
  puntoJugador = puntoJugador + valorCarta(carta)
  puntosHTML[0].innerText = `${puntoJugador}`

  const imgCarta = document.createElement('img')
  imgCarta.classList.add('carta')
  imgCarta.src = `assets/cartas/${carta}.png`
  divCartasJugador.append(imgCarta)

  if (puntoJugador > 21) {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputador(puntoJugador)
  } else if (puntoJugador === 21) {
    btnDetener.disabled = true
    btnPedir.disabled = true
    turnoComputador(puntoJugador)
  }
})

btnDetener.addEventListener('click', () => {
  btnDetener.disabled = true
  btnPedir.disabled = true
  turnoComputador(puntoJugador)
})

btnNuevo.addEventListener('click', () => {
  console.clear()
  deck = []
  deck = crearDeck()
  btnDetener.disabled = false
  btnPedir.disabled = false
  puntoJugador = 0
  puntosComputadora = 0
  puntosHTML[0].innerText = 0
  puntosHTML[1].innerText = 0
  divCartasComputadora.innerHTML = ''
  divCartasJugador.innerHTML = ''
})
