window.addEventListener ('load', ()=>{
    let lon
    let lat
    
    let tempValor = document.getElementById('tempValor')
    let tempDescripcion = document.getElementById ('tempDescripcion')
    let posicion = document.getElementById('localizacion')
    let iconoClima = document.getElementById ('iconoClima')
    let vientos = document.getElementById ('velocidadViento')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( ubicacion =>{
        lon = ubicacion.coords.longitude
        lat = ubicacion.coords.latitude

        const url = `https://api.openweathermap.org/data/2.5/weather?q=Cordoba&lang=es&units=metric&appid=c50ae525eb1339945626ded39ea6788d`
    
        fetch(url)
        .then (response => { return response.json()})
        .then (data =>{
            let temp = Math.round(data.main.temp)
            tempValor.textContent = `${temp} °C`
            let desc = data.weather[0].description
            tempDescripcion.textContent = desc.toUpperCase()

            posicion.textContent = data.name
            vientos.textContent = `${data.wind.speed} m/s`

            switch (data.weather[0].main){

                case 'Thunderstorm': //Tormenta
                      iconoClima.src='animated/thunder.svg'
                      break;

                    case 'Drizzle': //Llovizna
                    iconoClima.src='animated/rainy-2.svg'
                      break;

                    case 'Rain': //Lluvia
                    iconoClima.src='animated/rainy-7.svg'
                      break;

                    case 'Snow': //Nieve
                    iconoClima.src='animated/snowy-6.svg'
                      break;      

                    case 'Clear': //Despejado
                    iconoClima.src='animated/day.svg'
                      break;


                    case 'Atmosphere': //Niebla
                    iconoClima.src='animated/weather.svg'
                        break;  

                    case 'Clouds': //Nublado
                    iconoClima.src='animated/cloudy-day-1.svg'
                        break;  

                    default: //Defecto
                    iconoClima.src='animated/cloudy-day-1.svg'

            }
            





        })
    
    })
    }
})