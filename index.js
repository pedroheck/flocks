const screen = {width: innerWidth - 500, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = screen.width;
canvas.height = screen.height;

const c = canvas.getContext('2d');