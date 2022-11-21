// -------
// -------
// -------
// -------
// -------
// Funcion para llamar a un recurso interno que seria el doc de TXT document aka === "sample.txt"
// Part 1 - Creamos funcion
const getText = () => {
  // Part 2 - Llamamos al metodo fetch y le pasamos la URL del recurso que queremos usar
  fetch("sample.txt")
    // Part 3 - Recibimos info de la llamada por parte del fetch y lo que hacemos es entro de la promesa llamamos a una expresion para poder manipular/limpiar la info que recibimos dentro del fetch, como esta info chicos es texto dentro de una promesa tenemos que convertir este texto en un string para usarlo correctamente dentro de nuestro frontEnd!
    .then((response) => response.text())
    // part 4 - Una vez recibamos la info del recurso que queremos recibir, limpiamos el recurso para usarlo adecuamente dentro de nuestro front y dentro de esta promesa aprovechamos y le inyectamos dicho recurso dentro de nuestro front mediante manipulacion del DOM.
    .then((cleanText) => {
      //document.querySelector("#output").innerHTML += cleanText;
      document.querySelector("#output").innerText = cleanText;
    })
    // Part 5 - Como buenos programadores, dejamos parametrizado los dos casos de uso en este ambito.
    .catch((error) => console.log(error));
};
// Part 6 - Aputnamos al DOM mediante el ID y usamos el metodo addEventListener() para pasarle el click event con la funcion al botonsito dentro del HTML.
document.querySelector("#getText").addEventListener("click", getText);

// -------
// -------
// -------
// -------
// -------
// LLamando a un archivo JSON interno dentro de nuestra machine!
const getJson = () => {
  // Part 1 - Clara J - Llamamos al recurso
  fetch("users.json")
    // Part 2 - Xavi - recibimo s info del recurso y manipluamos/limpiams segun el tipo de recurso.
    .then((response) => response.json())
    .then((users) => {
      let userData = "";
      users.forEach((user) => {
        userData += `
                <ul>
                <li>${user.name}</li>
                <li>${user.email}</li>
                <li>${user.id}</li>
                </ul>
                `;
      });
      document.querySelector("#output").innerHTML += userData;
    })
    .catch((error) => console.log(error));
};
document.querySelector("#getJson").addEventListener("click", getJson);

// -------
// -------
// -------
// -------
// -------
// Llamar a una API externa xiquets?

const getExternalAPiInfo = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((res) => {
      let externalApiInfo = "";
      res.forEach((post) => {
        externalApiInfo += `
              <div class="card" style="width: 15rem">
                <img
                    class="card-img-top"
                    src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltde04169680d1e8d6/6333adfb110d52448841a252/GettyImages-1243560834.jpg"
                    alt="A cool image about the Wu"
                />
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">
                        ${post.body}
                    </p>
                </div>
              </div>
              `;
      });
      document.querySelector("#output").innerHTML += externalApiInfo;
    })
    .catch((error) => console.log(error));
};
document
  .querySelector("#getExternalAPiInfo")
  .addEventListener("click", getExternalAPiInfo);

/// Enviar un mensaje al endPoint de jsonPlaceholder para poder emitir info dentro del request!
// HTTP Status Messages Segment - [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status]
const addPost = (preventForm) => {
  preventForm.preventDefault();
  // nos traemos los values/valores de los inputs
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;
  // Vamos a usar el fetch() para poder enviar info a el endpoint!
  fetch("https://jsonplaceholder.typicode.com/posts", {
    // Tipo de request que queremos ejecutar, en este caso es un POST request!
    method: "POST",
    // Los headers son metadatos adicionales pasados a la API para ayudar al servidor a entender qué tipo de solicitud está tratando, por ejemplo "content-type".
    headers: {
      // content-type es el tipo de contenido que acepta este request
      "Content-type": "application/json",
      // Accept, tenemos la posibilidad de expandir el tipo de dato que se le pasa a este request!
      Accept: "text/plain, application/json",
    },
    // El body se encarga de enviar la data que nosotros queremos enviar, ahora recuerdense que como estamos trabajando con formatos JSON prod efecto tenemos que enviar la respuesta como JSON, por ende usamos el JSON.stringify(!)
    body: JSON.stringify({ title: title, body: body }),
  })
    .then((response) => response.json())
    .then((formData) => console.log(formData))
    .catch((error) => console.log(error));
};
document.querySelector("#addPost").addEventListener("submit", addPost);
