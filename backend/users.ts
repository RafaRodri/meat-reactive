export class User {
    constructor(public email: string,
                public name: string,
                private password: string){}

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password
    }
}


//lista de usuários em memória (indexado pelo email)
export const users: {[key: string]: User} = {
    "rafael@teste.com": new User('rafael@teste.com', 'Rafael', '123'),
    "rodri@teste.com": new User('rodri@teste.com', 'Rodri', '123')
}
