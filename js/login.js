document.addEventListener('DOMContentLoaded', () => {

    // constantes //

    const formulario = document.querySelector('form');
    const msjemail = 'el correo electrónico introducido no es válido';
    const msj = 'campo obligatorio';

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validacion()) {
            event.preventDefault()
            console.log("El formulario no es valido");
        }
        else {
            event.preventDefault();
            console.log("El formulario es válido");
        }
        
    });

    
    function validarCampo(input,mensaje) {
        const campo = document.getElementById(input.id);
        const value = campo.value.trim();
        
        if (value==''){
            mostrarError(campo,mensaje);
            return false;
        }
        else {
            eliminarError(campo,mensaje);
            return true;
        }
        
    }
    
    const mostrarError = (input,mensaje) => {
        const divPadre = input.parentNode;
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = mensaje;
    }
    
    const eliminarError = (input) => {
        const divPadre = input.parentNode;
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = '';
        
    };
    
    function validarEmail(input, msj, msjemail) {
        // obtenemos el elemento
        const campo = document.getElementById(input.id);
        const value = campo.value.trim();
        if (value == '') {
            mostrarError(input, msj);
            return false;
        } else
        if (!isEmail(value)) {
            mostrarError(input, msjemail);
            return false;
        } 
        else {
            eliminarError(input);
            return true;
        }
    }
    
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email); //devuelve true si la cadena coincide con el patrón de la expresión regular
    }
    
    function validacion() {
        let formValid = true;
        formulario.querySelectorAll('input').forEach(input => {
            if (input.type=='email') {
                     if (!validarEmail(input,msj,msjemail)) {
                         formValid = false;
                        };
                    }
                    else 
                    if (!validarCampo(input,msj)) {
                        formValid = false;
                    };
                    
             });
         return formValid;
        };
            
            
        formulario.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', () => {
              if (input.type=='email') {
                  validarEmail(input,msj,msjemail); 
              } else {
                  validarCampo(input,msj);
              }
           }); 
        });
        
});