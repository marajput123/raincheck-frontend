import { IEvent } from "src/Shared/Models/IEvent";
import { RoleType } from "src/Shared/Models/IMembership";
import { IRole } from "src/Shared/Models/IRole";

export const getRoleFromEvent = (event: IEvent, roleType: RoleType) => {
    const index = event.roles.findIndex((role: IRole | string) => {
        role = role as IRole;
        if (role.name === roleType) {
            return role
        }
    });
    return event.roles[index] as IRole;
}