import { Container } from 'typedi';
import app from './app';
import { ConfigService } from './services/config.service';

const port = Container.get(ConfigService).get('PORT');

app.listen(port, () => console.log('Server started on port %d', port));
