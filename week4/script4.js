async function getWeather(){
    let city=document.getElementById("city").value;

    let geo=await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    ).then(r=>r.json());

    if(!geo.results)return weather.innerHTML="City not found";

    let {latitude,longitude,name}=geo.results[0];

    let data=await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
    ).then(r=>r.json());

    let w=data.current;

    weather.innerHTML=`
        <h2>${name}</h2>
        <h1>${w.temperature_2m}°C</h1>
        ${w.relative_humidity_2m}% &nbsp; ${w.wind_speed_10m} km/h
    `;

    week.innerHTML=data.daily.time.map((d,i)=>`
        <div class="card">
            <b>${new Date(d).toLocaleDateString("en",{weekday:"short"})}</b><br><br>
            ${data.daily.temperature_2m_max[i]}°<br>
            ${data.daily.temperature_2m_min[i]}°
        </div>
    `).join("");
}