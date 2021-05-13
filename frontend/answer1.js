
const Arr = [{
    id: "id0",
    name: "",
    info: {
        email: "",
        adress: "",
    }
},
{
    id: "id2",
    name: "some",
    info: {
        email: "mail.ru",
        adress: "larina",
    }
},
{
  id: "id3",
}]

function f(Arr) {
  Arr.forEach(obj =>
    console.log('имя: ' + (obj.name ? obj.name : '""')  + (!obj.info ? '' : (', e-mail: ' + (obj.info.email ? obj.info.email : '""') + ', адрес:' + (obj.info.adress ? obj.info.adress : '""')))));
}

f(Arr);
