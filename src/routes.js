import { Router } from "express";
import ContactController from "./app/controller/ContactController.js";

const router = Router();
//Nesta forma, você está passando a referência da função index do ContactController como um callback para a rota. O Express chamará essa função sempre que a rota /contacts for acessada.
router.get("/contacts", ContactController.index);
/* 
Aqui, você está chamando a função index imediatamente e passando o resultado da chamada como o callback para a rota. Isso não funcionará como esperado porque a função index espera receber req e res como argumentos (dados pelo Express quando a rota é acessada).
router.get("/contacts", ContactController.index());
Nesta forma, você está passando uma função anônima (arrow function) como o callback para a rota. Esta função retorna a referência do método index, mas não o chama.
router.get("/contacts", () => ContactController.index);
*/
router.get('/contacts/:id',ContactController.show)

export default router;
