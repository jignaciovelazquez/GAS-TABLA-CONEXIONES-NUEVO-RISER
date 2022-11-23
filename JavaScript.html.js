

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

//Star
window.addEventListener('DOMContentLoaded', () => {

    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
})


//Variables

let anterior = [];
let contadorCaja = 1;
let CUERPO = "";
let flag = 0;
let totalPuertos = 0;
let aux = 1;
let buffer = 1;
let cajas = 1;
let num = 5;



//Eventos

document.getElementById("FORMULARIO").addEventListener('submit', () => {

    if ((document.getElementById("TIPO").value == "") || (document.getElementById("NRISER").value == "") || (document.getElementById("PARKING").value == "") || (document.getElementById("DIRECCION").value == "")) {
        alert("Debe completar todos los campos")
        return
    }

    for (let index = 1; index <= (document.getElementById("NRISER").value); index++) {
        if ((document.getElementById("TIPORISER" + index).value == "") || (document.getElementById("NCAJAS" + index).value == "")) {
            alert("Debe completar todos los campos")
            return
        }
    }

    for (let index = 1; index <= (contadorCaja - 1); index++) {
        if ((document.getElementById("PUERTOSCAJA" + index).value == "") || (document.getElementById("YOFC" + index).value == "")) {
            alert("Debe completar todos los campos")
            return
        }
    }


    document.getElementById("GENERAR").disabled = true;


    setTimeout(function () {
        //window.alert("Gestión cargada correctamente");
        document.getElementById("GENERAR").disabled = false;
    }, 2000);


    TotalRiser = document.getElementById("NRISER").value;
    for (let i = 1; i <= TotalRiser; i++) {
        cajas = document.getElementById("NCAJAS" + i).value;
        for (let j = 1; j <= cajas; j++) {

            totalPuertos = totalPuertos + parseInt(document.getElementById("PUERTOSCAJA" + aux).value, 10);
            aux++;
        }

        if (totalPuertos > (document.getElementById("TIPORISER" + i).value)) {
            alert("Los puertos conectados en las CEC-" + i + " superan la capacidad del Riser seleccionado, Porfavor verificar.... ");
            totalPuertos = 0;
            aux = 1;
            return
        }

        totalPuertos = 0;
    }

    aux = 1;

    document.getElementById("GIRAR").hidden = false;

    generarTabla();

})

document.getElementById("NRISER").addEventListener('change', () => {

    const RiserxCaja = document.createElement('DIV');
    const RiserPadre = document.getElementById("RISERCAJAS");
    RiserxCaja.classList.add("col-12", "position-relative");

    RiserPadre.innerHTML = "";
    RiserPadre.append(RiserxCaja);

    TotalRiser = document.getElementById("NRISER").value;

    for (let i = 1; i <= TotalRiser; i++) {

        const RiserxCaja = document.createElement('DIV');
        const RiserPadre = document.getElementById("RISERCAJAS");
        RiserxCaja.classList.add("col-12", "position-relative");

        RiserxCaja.innerHTML = `<div class="row">
                                    <div class="input-group" style="background-color: #B5BCD1;">
                                    <div class="col-2 text-center">
                                        <label for="NRISER${i}" class="col-form-label text-start">Riser:</label>
                                    </div>
                                    <div class="col-1">
                                        <input id="NRISER${i}" class="form-control" list="datalistriser" required>
                                            <datalist id="datalistriser">
                                                <option value="1">
                                                <option value="2">
                                                <option value="3">
                                                <option value="4">
                                                <option value="5">
                                                <option value="6">
                                            </datalist>
                                        <div class="invalid-tooltip">
                                            ¡Debes ingresar el Nro del Riser!
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <select class="form-select" id="TIPORISER${i}" required>
                                            <option selected value="">Tipo</option>
                                            <option value="24">24</option>
                                            <option value="48">48</option>
                                        </select>
                                        <div class="invalid-tooltip">
                                            ¡Debes ingresar el Tipo de Riser!
                                        </div>
                                    </div>
                                    <div class="col-2 text-center">
                                        <label for="NCAJAS${i}" class="col-form-label text-center">Cajas:</label>
                                    </div>
                                    <div class="col-1 ms-2">
                                        <select class="form-select" id="NCAJAS${i}" required>
                                            <option selected value=""></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </select>
                                        <div class="invalid-tooltip">
                                            ¡Debes ingresar el Nro de Cajas conectadas al Riser!
                                        </div>
                                    </div>
                                    </div>
                                    <div id="CajaPisos${i}" class="col-12 position-relative">
                                    </div>
                                </div>`;

        RiserPadre.append(RiserxCaja);
        document.getElementById("NRISER" + i).value = i;

    }
})


document.getElementById("RISERCAJAS").addEventListener('change', () => {

    for (let i = 1; i <= TotalRiser; i++) {

        if (((document.getElementById("NCAJAS" + i).value != "") && (anterior[i] == "")) || ((document.getElementById("NCAJAS" + i).value != "") && (document.getElementById("NCAJAS" + i).value != anterior[i]))) {

            const Cajaxpiso = document.createElement('DIV');
            const ElementoPadre = document.getElementById("CajaPisos" + i);
            Cajaxpiso.classList.add("col-12", "position-relative");

            ElementoPadre.innerHTML = "";

            ElementoPadre.append(Cajaxpiso);

            TotalCajas = document.getElementById("NCAJAS" + i).value;

            for (let index = 1; index <= TotalCajas; index++) {

                const Cajaxpiso = document.createElement('DIV');
                const ElementoPadre = document.getElementById("CajaPisos" + i);
                Cajaxpiso.classList.add("col-12", "position-relative");

                Cajaxpiso.innerHTML = `<div class="input-group pt-2">
                                        <div class="col-2 offset-sm-2">
                                            <input id="YOFC${contadorCaja}" class="form-control" list="datalistOptions" placeholder="Seleccione" required>
                                            <datalist id="datalistOptions">
                                                <option value="CEC-1">
                                                <option value="CEC-2">
                                                <option value="CEC-3">
                                                <option value="CEC-4">
                                                <option value="CEC-5">
                                                <option value="CEC-6">
                                            </datalist>
                                            <div class="invalid-tooltip">
                                            ¡Debes ingresar el Nro de la Caja!
                                            </div>
                                        </div>

                                        <!--------------------------------------- 
                                        <div class="col-sm-2">
                                            <label class="form-check-label" for="TIPOCAJA${contadorCaja}">8</label>
                                            <div class="form-check form-check-inline form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="TIPOCAJA${contadorCaja}"
                                                    value="1" required>
                                                <label class="form-check-label" for="TIPOCAJA${contadorCaja}">16</label>
                                            </div>
                                        </div>
                                        ------------------------->

                                        <div class="col-2 text-center">
                                            <label for="PUERTOSCAJA${contadorCaja}" class="col-form-label text-start">IN Conectados:</label>
                                        </div>
                                        <div class="col-2">
                                            <select class="form-select" id="PUERTOSCAJA${contadorCaja}" required>
                                                <option selected value=""></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                            </select>
                                            <div class="invalid-tooltip">
                                            ¡Debes ingresar el Nro de puertos de entrada conectados en la caja!
                                            </div>
                                        </div>
                                    </div>`;

                ElementoPadre.append(Cajaxpiso);

                if (document.getElementById("DIRECCION").value == 2) {

                    let w = parseInt(TotalCajas, 10) + 1 - parseInt(contadorCaja, 10);

                    document.getElementById("YOFC" + contadorCaja).value = "CEC-" + w;

                } else {
                    document.getElementById("YOFC" + contadorCaja).value = "CEC-" + contadorCaja;
                }


                contadorCaja++;
            }
            anterior[i] = document.getElementById("NCAJAS" + i).value;
        }
    }
})



document.getElementById("BORRAR").addEventListener('click', () => {
    limpiar();
})


//Funciones

function generarTabla() {

    const tablaInser = document.createElement('DIV');
    const TablaPadre = document.getElementById("TABLA");
    tablaInser.classList.add("col-10", "offset-sm-1");

    TablaPadre.innerHTML = "";

    tablaInser.innerHTML = `<table id="tablasalida" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style="background-color: #D2D6E5; font-size: 20px">FIBRA</th>
                                        <th scope="col" style="background-color: #2A5962; color: #FFFFFF; font-size: 20px">PELO</th>
                                        <th scope="col" style="background-color: #158B28; color: #FFFFFF; font-size: 20px">CEC</th>
                                        <th scope="col" style="background-color: #158B28; color: #FFFFFF; font-size: 20px">PUERTO IN</th>
                                        <th scope="col" style="background-color: #AD2015; color: #FFFFFF; font-size: 20px">SPLITTER</th>
                                        <th scope="col" style="background-color: #AD2015; color: #FFFFFF; font-size: 20px">PUERTO OUT</th>
                                        <th scope="col" style="background-color: #000000; color: #FFFFFF; font-size: 20px">PARKING</th>
                                    </tr>
                                </thead>
                                <tbody id="cuerpotabla">
                                </tbody>
                                <tfoot style="margin-left:80px; background-color: #D2D6E5">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>`;

    TablaPadre.append(tablaInser);

    let j = 1;
    let TotalConectados = 0;
    let puertoOut = 0;
    let parking = 0;
    let aconectar = 0;
    let contPelos = 0;
    let Npuerto = "";
    let Nparking = "";
    let contadorCaja2 = 0;
    let contspliter = 0;
    let Letrasalida = "";
    let ASCII = 65;
    TotalRiser = document.getElementById("NRISER").value;

    for (let i = 1; i <= TotalRiser; i++) {
        CajasTotal = document.getElementById("NCAJAS" + i).value;
        riserActual = document.getElementById("TIPORISER" + i).value;
        let riserSalida = document.getElementById("NRISER" + i).value;
        for (let index = 1; index <= CajasTotal; index++) {
            contadorCaja2++;

            PuertosTotal = document.getElementById("PUERTOSCAJA" + contadorCaja2).value;
            let CEC = document.getElementById("YOFC" + contadorCaja2).value;

            if (document.getElementById("TIPO").value == 1) {

                aconectar = Math.ceil(PuertosTotal * 0.25);
            }

            else {
                aconectar = Math.ceil(PuertosTotal * 0.5);
            }



            for (let index2 = 1; index2 <= PuertosTotal; index2++) {

                if (index2 <= aconectar) {
                    puertoOut++;
                    Npuerto = puertoOut;
                    contspliter++;
                    Letrasalida = String.fromCharCode(ASCII);
                    Nparking = "-";
                    if (puertoOut == 8) {
                        puertoOut = 0;
                        ASCII++;
                    }

                }
                else {
                    parking++;
                    Nparking = parking;
                    Npuerto = "-";
                    Letrasalida = "-";

                    if (document.getElementById("PARKING").value == "NO") {
                        Nparking = "-";
                    }
                }

                contPelos++

                let salidaPelos = formatoPelos(contPelos, riserActual);

                CUERPO = `<td style="text-align: center">${riserSalida}</td>
                            ${salidaPelos}
                            <td style="text-align: center">${CEC.slice(4, 6)}</td>
                            <td style="text-align: center">${index2}</td>
                            <td style="text-align: center">${Letrasalida}</td>
                            <td style="text-align: center">${Npuerto}</td>
                            <td style="text-align: center">${Nparking}</td>`;


                document.getElementById("cuerpotabla").insertRow(-1).innerHTML = CUERPO;
            }
        }
        contPelos = 0;
        buffer = 1;
    }


    for (let i = 1; i <= TotalRiser; i++) {
        CajasTotal = document.getElementById("NCAJAS" + i).value;
        for (let index = 1; index <= CajasTotal; index++) {
            TotalConectados = TotalConectados + parseInt(document.getElementById("PUERTOSCAJA" + j).value, 10);
            j++;
        }
    }
}


function limpiar() {
    document.getElementById("TIPO").value = "";
    document.getElementById("NRISER").value = "";
    document.getElementById("TIPORISER").value = "";
    document.getElementById("NCAJAS").value = "";
    document.getElementById("CajaPisos").innerHTML = "";

}

function formatoPelos(contPelos, riserActual) {

    let Marca = "";

    if (riserActual == 24) {
        if (contPelos <= 12) {
            Marca = "";
        }
        if (contPelos > 12) {
            Marca = " 6R";
        }

    }

    if (riserActual == 48) {
        if (contPelos <= 12) {
            Marca = "";
        }
        if ((contPelos > 12) && (contPelos <= 24)) {
            Marca = " 3R";
        }
        if ((contPelos > 24) && (contPelos <= 36)) {
            Marca = " 6R";
        }
        if (contPelos > 36) {
            Marca = " 9R";
        }

    }

    if (buffer <= 12) {
        switch (buffer) {
            case 1: output = `<td style="text - align: center; background-color: #0000ff; color: #FFFFFF">Azul${Marca}</td>`; break;
            case 2: output = `<td style="text - align: center; background-color: #ff8000; color: #FFFFFF">Naranja${Marca}</td>`; break;
            case 3: output = `<td style="text - align: center; background-color: #008f39; color: #FFFFFF">Verde${Marca}</td>`; break;
            case 4: output = `<td style="text - align: center; background-color: #804000; color: #FFFFFF">Marron${Marca}</td>`; break;
            case 5: output = `<td style="text - align: center; background-color: #808080; color: #FFFFFF">Gris${Marca}</td>`; break;
            case 6: output = `<td style="text - align: center; background-color: #ffffff; color: #000000">Blanco${Marca}</td>`; break;
            case 7: output = `<td style="text - align: center; background-color: #ff0000; color: #FFFFFF">Rojo${Marca}</td>`; break;
            case 8: output = `<td style="text - align: center; background-color: #000000; color: #FFFFFF">Negro${Marca}</td>`; break;
            case 9: output = `<td style="text - align: center; background-color: #FFFF00; color: #000000">Amarillo${Marca}</td>`; break;
            case 10: output = `<td style="text - align: center; background-color: #4c2882; color: #FFFFFF">Violeta${Marca}</td>`; break;
            case 11: output = `<td style="text - align: center; background-color: #ff0080; color: #FFFFFF">Rosa${Marca}</td>`; break;
            case 12: output = `<td style="text - align: center; background-color: #51D1F6; color: #000000">Celeste${Marca}</td>`; buffer = 0; break;
        }
        buffer++;
    }

    return output;

}

document.getElementById("GIRAR").addEventListener("click", function () {
    html2canvas(document.getElementById("TABLA")).then(function (canvas) {
        var anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);
        anchorTag.download = "TablaConexiones.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.click();
    });
});