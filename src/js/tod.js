function timeOfDay() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('timeOfDay').innerHTML = hours + ':' + minutes;
  setTimeout(timeOfDay, 3000);
}

window.onload = timeOfDay
