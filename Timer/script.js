let cuentaAtras;
const tiempoRestante = document.querySelector(".tiempoRestante");
const tiempoFinal = document.querySelector(".tiempoFinal");
const botones = document.querySelectorAll('[data-time]');

function temporizador(segundos) {
    clearInterval(cuentaAtras);
    const now = Date.now();
    const then = now + segundos * 1000;
    displayTiempoRestante(segundos);
    displayTiempoFinal(then);
  
    cuentaAtras = setInterval(() => {
      const segundosRestantes = Math.round((then - Date.now()) / 1000);
      if(segundosRestantes < 0) {
        clearInterval(cuentaAtras);
        return;
      }
      displayTiempoRestante(segundosRestantes);
    }, 1000);
  }
  
  function displayTiempoRestante(seconds) {
    const minutos = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutos}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    tiempoRestante.textContent = display;
    temporizador.textContent = display;
  }
  
  function displayTiempoFinal(timestamp) {
    const final = new Date(timestamp);
    const hora = final.getHours();
    const ajustarHora = hora > 12 ? hora - 12 : hora;
    const minutos = final.getMinutes();
    tiempoFinal.textContent = `Vuelve a las ${ajustarHora}:${minutos < 10 ? '0' : ''}${minutos}`;
  }
  
  function startTemporizador() {
    const segundos = parseInt(this.dataset.time);
    temporizador(segundos);
  }
  
  botones.forEach(button => button.addEventListener('click', startTemporizador));
  document.formMinutos.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutos = this.minutos.value;
    console.log(minutos);
    temporizador(minutos * 60);
    this.reset();
  });