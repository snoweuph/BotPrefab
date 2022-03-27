import 'module-alias/register';
import { addAlias, addAliases } from 'module-alias';

addAliases({
    '@base': `${__dirname}/../base`,
    "@types": `${__dirname}/../base/types`,
    "@interactions": `${__dirname}/../interactions`,
    "@utils": `${__dirname}/../utils`,
})