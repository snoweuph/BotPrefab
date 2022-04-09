import { PermissionResolvable } from 'discord.js';
/**
 * This is the base for all command categories.
 */
export default interface BaseCommandCategory {
    displayName: string;
    uniqueId: string;
    permissions: Array<PermissionResolvable>;
}
/**
 * This function will try to convert a object to a BaseCommandCategory if possible.
 * @param object - this is the object that is tryed to be converted to a BaseCommandCategory.
 * @returns The BaseCommandCategory if the object is a BaseCommandCategory, otherwise undefined.
 */
/* eslint-disable-next-line */
function isBaseCommandCategory(object: any): object is BaseCommandCategory {
    return object.displayName !== undefined && object.uniqueId !== undefined && object.permissions !== undefined;
}

export { isBaseCommandCategory };
