var lat= 31.742403100708444;
var lon= -106.43367351797366;
var apikey = "05f65e04126c3965d2df3c8631b93719"

const campo_latitud = document.querySelector("#campo_latitud");
const campo_longitud = document.querySelector("#campo_longitud");

const plantilla_temperatura = document.querySelector(".ContenedorTemp");
const ContenedorTarClima = document.querySelector("#ContenedorTarjetasClima");

const consultasPredefinidas = document.querySelector("#consultasPredefinidas");
function ConsultarTemperatura()
{

    if(campo_latitud.value == "")
    {
        alert("Campo Latitud Vacio, intente de nuevo")
    }
    else if(campo_longitud.value == "")
    {
        alert("Campo Longitud Vacio, intente de nuevo")
    }
    else
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+campo_latitud.value+"&lon="+campo_longitud.value+"&units=metric&appid="+ apikey).then(recurso=> recurso.json()).then
        (clima=>{
            console.log(clima);

            if(clima.cod == 200)
            {
                var clonTemp = plantilla_temperatura.cloneNode(true);
                ContenedorTarClima.prepend(clonTemp);
        
                clonTemp.style.display = "block";
        
                const nombre_zona = clonTemp.querySelector(".nombre_zona");
                nombre_zona.innerHTML = "<h1>" + clima.name + "</h1>";
        
                const siglas_pais = clonTemp.querySelector(".pais");
                siglas_pais.innerHTML = "<h1>" + clima.sys.country + "</h1>";
        
                const temperatura = clonTemp.querySelector(".temperatura");
                temperatura.innerHTML = "<h2>" + clima.main.temp + "°C" + "</h2>" ;
        
                const sensacion_termica = clonTemp.querySelector(".Sens_Term");
                sensacion_termica.innerHTML ="<p>" + "sensacion Termica: " + clima.main.feels_like + "°C"+ "</p>";
        
                const humedad = clonTemp.querySelector(".humedad");
                humedad.innerHTML ="<p>" + "Humedad: " + clima.main.humidity + "%"+ "</p>";
        
                const viento = clonTemp.querySelector(".viento");
                viento.innerHTML ="<p>" + "Viento a: " + clima.wind.speed * 3.6 + " km/h"+ "</p>";
        
                const presion_atmosferica = clonTemp.querySelector(".presion_atmosferica");
                presion_atmosferica.innerHTML ="<p>" + "Presion Atmosferica: " + clima.main.pressure + " hPa"+ "</p>";
        
                const descripcion = clonTemp.querySelector(".descripcion");
                descripcion.innerHTML = "<p>" +"Descripcion: " + clima.weather[0].description + "</p>";
        
                const boton_quitar = clonTemp.querySelector(".icono_cerrartarjeta");
                boton_quitar.addEventListener("click", function(){
                    clonTemp.remove();
                });
                const icono_clima = clonTemp.querySelector(".icono_clima");
                icono_clima.src = "https://openweathermap.org/img/wn/" + clima.weather[0].icon + "@4x.png"
            }
            else
            {
                alert(clima.message);
            }
        });
    }
   
}

function AbrirPredefinidos()
{
    consultasPredefinidas.style.display = "block";
}

function CerrarPredefinidos()
{
    consultasPredefinidas.style.display = "none";
}

function ConsultarPredefinido(latitud, longitud)
{
    CerrarPredefinidos();
    campo_latitud.value = latitud;
    campo_longitud.value = longitud
    ConsultarTemperatura();
}