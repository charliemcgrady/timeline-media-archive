import Koa from 'koa';
import router from './routes';

const app = new Koa();

app.use(router());
app.listen(4000);

console.log('Server running on port 4000');
