const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

window.addEventListener("load", () => {
  let location = document.getElementById("location");
  setInterval(() => {
    const today = new Date();
    const hours =
      today.getHours("hH") >= 13 ? today.getHours() - 12 : today.getHours();

    const chours = hours < 10 ? "0" + hours : hours;
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const seconds =
      today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
    const ma = today.getHours() >= 13 ? "PM" : "AM";
    const time = chours + ":" + minutes + ":" + seconds;
    document.querySelector(".time").innerHTML = time;
    const date =
      days[today.getDay()] +
      ", " +
      today.getDate() +
      " " +
      months[today.getMonth()] +
      ", " +
      today.getFullYear();
    document.querySelector(".date").innerHTML = date;
  }, 1);

  const checkError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        location.innerHTML = "Please allow access to location";

      case error.POSITION_UNAVAILABLE:
        location.innerHTML = "Location information unavailable";

      case error.TIMEOUT:
        location.innerHTML = "The request to get user location timed out";
    }
  };

  const showLocation = async (position) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );

    let data = await response.json();

    location.innerHTML = `${data.address.city}, ${data.address.country}`;
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    location.innerHTML = "The browser does not support geolocation";
  }
});
