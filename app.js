const campoTexto = document.querySelector('#texto-encriptado');
const campoMensaje = document.querySelector('#campo-mensaje');

let matrizReemplazo = [['a', 'mas'],  ['e', 'enter'], ['i', 'imes'], ['o', 'orbit'], ['u', 'ufat']];

// Encriptar

function btnEncriptar(){
  const texto = encriptacion(campoTexto.value);
  campoMensaje.value = texto;
  // Para que al accionar la acción desencriptar desaparezca la imagen y el mensaje de no encontrado
  document.getElementById("area-encriptador").style.display = 'none';
  // Si quisiera que vuelva a aparecer debo ejecutar lo siguiente
  document.getElementById("btn-copy").style.display = 'block';
}


function encriptacion (textoEncriptado){
  for(let i = 0;  i < matrizReemplazo.length; i++){
    // textoEncriptado = textoEncriptado.toLowerCase()
    if (textoEncriptado.includes(matrizReemplazo[i][0])){
      textoEncriptado = textoEncriptado.replaceAll(
        matrizReemplazo[i][0], 
        matrizReemplazo[i][1]
      )

      
    }
}
return textoEncriptado;
}

// Desencriptar
function btnDesencriptar(){
  const textoDes = Desencriptacion(campoTexto.value);
  campoMensaje.value = textoDes;

}

function Desencriptacion (textoDesencriptado){
  for(let i = 0; i<matrizReemplazo.length; i++) {
    if(textoDesencriptado.includes(matrizReemplazo[i][1])){
      textoDesencriptado = textoDesencriptado.replaceAll(
        matrizReemplazo[i][1], 
        matrizReemplazo[i][0]);
    }
    

    }
    return textoDesencriptado;  
  }

  // Para copiar el texto con el btn copiar

  const PERMISSIONS = [
    { name: "clipboard-read" },
    { name: "clipboard-write" }
    //{ name: "clipboard-read",  allowWithoutGesture: false },
    //{ name: "clipboard-read",  allowWithoutGesture: true  },
    //{ name: "clipboard-write", allowWithoutGesture: false },
    //{ name: "clipboard-write", allowWithoutGesture: true  }
  ];

  function permissionName(permission) {
    let name = permission.name.split('-').pop();
    if ('allowWithoutGesture' in permission) {
      name += ' ' + (permission.allowWithoutGesture ? '(without gesture)' : '(with gesture)');
    }
    return name;
  }
  
  
  Promise.all(
    PERMISSIONS.map( descriptor => navigator.permissions.query(descriptor) )
  ).then( permissions => {
    permissions.forEach( (status, index) => {
      let descriptor = PERMISSIONS[index],
        name = permissionName(descriptor),
        btn = document.createElement('button');
      btn.title = 'Click to request permission';
      btn.textContent = name;
      // Clicking a button (re-)requests that permission:
      btn.onclick = () => {
        navigator.permissions.request(descriptor)
          .then( status => { log(`Permission ${status.state}.`); })
          .catch( err => { log(`Permission denied: ${err}`); });
      };
      // If the permission status changes, update the button to show it
      status.onchange = () => {
        btn.setAttribute('data-state', status.state);
      };
      status.onchange();
      // permbuttons.appendChild(btn);
    });
  });

  // Function para copiar en el portapapeles

function  copyToClickBoard() {
    
    let content = document.getElementById('campo-mensaje').value;
    console.log(content);
         navigator.clipboard.writeText(content) 
        .then(() => {console.log('Text copied to clipboard...')})
        .catch(err => {
          console.log('Something went wrong', err);
        })
        console.log('estoy en la función');
  };