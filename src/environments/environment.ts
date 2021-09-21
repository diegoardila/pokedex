// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_uri: 'https://pokeapi.co/api/v2/',
  users: [
    { name: 'admin', image: 'assets/img/admin.png', password: '123456' },
    { name: 'root', image: 'assets/img/admin.png', password: 'password' },
  ],
  type_img:[
    {name:"normal",img:"assets/img/tipos/normal.gif",es:"Normal"},
    {name:"fighting",img:"assets/img/tipos/lucha.gif",es:"Lucha"},
    {name:"flying",img:"assets/img/tipos/volador.gif",es:"Volador"},
    {name:"poison",img:"assets/img/tipos/veneno.gif",es:"Veneno"},    
    {name:"ground",img:"assets/img/tipos/tierra.gif",es:"Tierra"},
    {name:"rock",img:"assets/img/tipos/roca.gif",es:"Roca"},
    {name:"ghost",img:"assets/img/tipos/fantasma.gif",es:"Fantasma"},
    {name:"bug",img:"assets/img/tipos/bicho.gif",es:"Bicho"},
    {name:"steel",img:"assets/img/tipos/acero.gif",es:"Acero"},
    {name:"fire",img:"assets/img/tipos/fuego.gif",es:"Fuego"},
    {name:"water",img:"assets/img/tipos/agua.gif",es:"Agua"},
    {name:"grass",img:"assets/img/tipos/planta.gif",es:"Planta"},
    {name:"electric",img:"assets/img/tipos/electrico.gif",es:"Eléctrico"},
    {name:"psychic",img:"assets/img/tipos/psiquico.gif",es:"Psíquico"},
    {name:"ice",img:"assets/img/tipos/hielo.gif",es:"Hielo"},
    {name:"dragon",img:"assets/img/tipos/dragon.gif",es:"Dragón"},
    {name:"dark",img:"assets/img/tipos/siniestro.gif",es:"Siniestro"},
    {name:"fairy",img:"assets/img/tipos/hada.gif",es:"Hada"},
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
