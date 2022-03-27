import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
	'@base': `${__dirname}/../base`,
	'@baseTypes': `${__dirname}/../base/types`,
	'@classes': `${__dirname}/../base/classes`,
	'@schema': `${__dirname}/../base/schema`,
	'@interactions': `${__dirname}/../interactions`,
	'@utils': `${__dirname}/../utils`,
	'@assets': `${__dirname}/../assets`,
})