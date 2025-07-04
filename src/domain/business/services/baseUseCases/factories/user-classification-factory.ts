import UserClassification from "../implementation/user-classification";
import { IUserClassification } from "../interfaces/i-user-classification";

class UserClassificationFactory {
    public static build(): IUserClassification {
        return new UserClassification()
    }
}

export = UserClassificationFactory
