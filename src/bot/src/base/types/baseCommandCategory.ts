import { PermissionResolvable } from 'discord.js';

export default interface BaseCommandCategory {
    displayName: string;
    uniqueId: string;
    permissions: Array<PermissionResolvable>;
}

function isBaseCommandCategory(object): object is BaseCommandCategory {
	return object.displayName !== undefined && object.uniqueId !== undefined && object.permissions !== undefined;
}


export { isBaseCommandCategory };