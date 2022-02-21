import { EventEmitter } from 'events';
import { Connection } from 'mysql2/promise';
import Database from './Database';

class StateManager extends EventEmitter {
    connection: Connection
    constructor(opts?: any) {
        super(opts);
        Database.then((connection: Connection) => {
            this.connection = connection;
            console.log('[StateManager] Connected to SQL Database');
        });
    }
}

export default new StateManager();
