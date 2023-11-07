import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseError } from '../errors/BaseError';
import { CreateUserSchema } from '../dtos/users/createUserDto';
import { ZodError } from 'zod';

export class UserController {
    constructor(
        // injeção de dependências aqui <<<
        private userBusiness: UserBusiness
    ) {}

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = CreateUserSchema.parse({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // após a injeção de dependências, não precisamos mais instanciar a classe:
            // const userBusiness = new UserBusiness();
            // const output = await userBusiness.createUser(input);

            // agora podemos usar a classe injetada com this:
            const output = await this.userBusiness.createUser(input);

            res.status(201).send(output);
        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                res.status(400).send(error.issues); // issues é um array de erros do zod
            }

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send('Erro inesperado');
            }
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q as string | undefined,
            };

            // const userBusiness = new UserBusiness();
            // const output = await userBusiness.getUsers(input);

            const output = await this.userBusiness.getUsers(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send('Erro inesperado');
            }
        }
    };

    public editUser = async (req: Request, res: Response) => {
        try {
            const input = {
                idToEdit: req.params.id,
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            // const userBusiness = new UserBusiness();
            // const output = await userBusiness.editUser(input);

            const output = await this.userBusiness.editUser(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send('Erro inesperado');
            }
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const input = {
                idToDelete: req.params.id,
            };

            // const userBusiness = new UserBusiness();
            // const output = await userBusiness.deleteUser(input);

            const output = await this.userBusiness.deleteUser(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send('Erro inesperado');
            }
        }
    };
}
