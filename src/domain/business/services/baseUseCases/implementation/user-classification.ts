import { CommonFieldsDto } from "./../../../../../domain/entity/dto/common-fields-requests-dto";
import { IUserClassification } from "../interfaces/i-user-classification";
import StringUtil from "../../../../../infraestructure/util/string-util";

const stringUtil = new StringUtil()

class UserClassification implements IUserClassification {
    userClassification(userDetail: CommonFieldsDto) {
        const result: {nivel: string[], objetivo: string[]} = {
            nivel: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'],
            objetivo: []
        }

        if(userDetail.nivel != "All"){
            result.nivel = result.nivel.slice(0, result.nivel.indexOf(stringUtil.limparTexto(userDetail.nivel)) + 1)
        }

        for(const item of userDetail.objetivo.split(';')){
            result.objetivo.push(stringUtil.limparTexto(item))
        }

        return result
    }
}

export = UserClassification
