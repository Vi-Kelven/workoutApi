export interface IMembersRepository {
    //Select
    listAvailableUsers(): Promise<any>
    listUsers(): Promise<any>
    //Update

    //Delete
}