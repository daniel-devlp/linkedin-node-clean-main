import express, { Router } from 'express';
import cors from 'cors'; // Importa el paquete cors

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(cors({
      origin: 'http://localhost:5173', // Permite solo tu frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Usar las rutas definidas
    this.app.use(this.routes);
    this.app.use(cors()); // ¡Solo para desarrollo!
    this.app.use((req, res, next) => {
  console.log('Headers recibidos:', req.headers);
  next();
});
    // Escuchar el puerto
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);

    });
  }
}