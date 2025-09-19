import MembersRepository from "../implementation/members.repository";
import { IMembersRepository } from "../interfaces/i-members-repository";

class MembersRepositoryFactory {
    public static create(): IMembersRepository {
        return new MembersRepository()
    }
}

export = MembersRepositoryFactory
