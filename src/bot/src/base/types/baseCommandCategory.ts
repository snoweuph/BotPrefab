import { PermissionResolvable } from 'discord.js';

export default interface BaseCommandCategory {
    displayName: string;
    uniqueId: string;
    permissions: Array<PermissionResolvable>;
}

/* eslint-disable-next-line */
function isBaseCommandCategory(object: any): object is BaseCommandCategory {
	return object.displayName !== undefined && object.uniqueId !== undefined && object.permissions !== undefined;
}

export { isBaseCommandCategory };
