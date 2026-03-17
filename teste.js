import { log } from 'console';
import http from 'http';

const PORT = 3001;

const rotas = {
    '/':'Index do Curso de JS API',
    '/livros':'Livros do Curso',
    '/cursos':'Cursos de JS'
};

const server = http.createServer((req, resp) => {
    resp.writeHead(200, { 'Content-Type':'text/plain' });
    resp.end(rotas[req.url]);
});


server.listen(PORT, () => {
    console.log('Servidor em Execucao');
});