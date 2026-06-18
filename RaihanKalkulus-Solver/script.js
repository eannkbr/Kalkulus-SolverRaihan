let riwayat=[];

document
.getElementById("operasi")
.addEventListener("change",()=>{

if(
document.getElementById("operasi").value
==="trapesium"
){

document.getElementById(
"trapesiumInput"
).style.display="block";

}
else{

document.getElementById(
"trapesiumInput"
).style.display="none";

}

});

function tambahRiwayat(teks){

riwayat.unshift(teks);

let html="";

riwayat.forEach(item=>{

html+=`
<div class="history-item">
${item}
</div>
`;

});

document.getElementById(
"history"
).innerHTML=html;

}

function hitung(){

let fungsi=
document.getElementById("fungsi").value;

let operasi=
document.getElementById("operasi").value;

try{

if(operasi==="turunan"){

let hasil=
math.derivative(
fungsi,
"x"
).toString();

document.getElementById(
"hasil"
).innerHTML=
"Turunan : " + hasil;

gambarGrafik(
fungsi,
hasil
);

tambahRiwayat(
"Turunan " +
fungsi +
" = " +
hasil
);

}

else if(
operasi==="limit"
){

let hasil=
math.evaluate(
fungsi,
{x:2}
);

document.getElementById(
"hasil"
).innerHTML=
"Limit x → 2 = " +
hasil;

gambarGrafik(
fungsi,
math.derivative(
fungsi,
"x"
).toString()
);

tambahRiwayat(
"Limit " +
fungsi +
" = " +
hasil
);

}

else if(
operasi==="trapesium"
){

let a=
parseFloat(
document.getElementById("a").value
);

let b=
parseFloat(
document.getElementById("b").value
);

let n=
parseInt(
document.getElementById("n").value
);

let hasil=
trapezoid(
fungsi,
a,
b,
n
);

document.getElementById(
"hasil"
).innerHTML=
"Integral Trapesium = " +
hasil.toFixed(6);

gambarGrafik(
fungsi,
math.derivative(
fungsi,
"x"
).toString()
);

tambahRiwayat(
"Integral Trapesium " +
fungsi +
" = " +
hasil.toFixed(6)
);

}

}
catch(err){

document.getElementById(
"hasil"
).innerHTML=
"Input tidak valid";

}

}

function trapezoid(
fungsi,
a,
b,
n
){

let h=(b-a)/n;

let sum=0;

for(
let i=1;
i<n;
i++
){

sum += math.evaluate(
fungsi,
{x:a+i*h}
);

}

return h*(
(
math.evaluate(
fungsi,
{x:a}
)
+
math.evaluate(
fungsi,
{x:b}
)
)/2
+
sum
);

}

function gambarGrafik(
fungsi,
turunan
){

let x=[];
let y1=[];
let y2=[];

for(
let i=-10;
i<=10;
i+=0.2
){

x.push(i);

try{

y1.push(
math.evaluate(
fungsi,
{x:i}
)
);

}
catch{

y1.push(null);

}

try{

y2.push(
math.evaluate(
turunan,
{x:i}
)
);

}
catch{

y2.push(null);

}

}

Plotly.newPlot(
"grafikFungsi",
[
{
x:x,
y:y1,
type:"scatter",
name:"f(x)"
}
],
{
paper_bgcolor:"transparent",
plot_bgcolor:"transparent",
font:{color:"white"},
title:"Grafik Fungsi"
}
);

Plotly.newPlot(
"grafikTurunan",
[
{
x:x,
y:y2,
type:"scatter",
name:"f'(x)"
}
],
{
paper_bgcolor:"transparent",
plot_bgcolor:"transparent",
font:{color:"white"},
title:"Grafik Turunan"
}
);

}