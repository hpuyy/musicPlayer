let html = "<img src='static/loading.svg' style='position: relative; top: 47%; margin-left: calc(50% + 110px); transform: translate(-50%, -50%)'>";

let el = document.createElement("div");

el.innerHTML = html;

el.style = "position: absolute; width: 100%; height: 100%; top: 0; left: 0;";

el.id = "loading-nai";

let Container = document.body;

export default function (remove = false) {
  if(remove) {
    try {
      Container.removeChild(document.getElementById('loading-nai'));
    }
    catch (e) {

    }
    return
  }
  Container.appendChild(el);
}
