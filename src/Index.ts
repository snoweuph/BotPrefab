import { config } from 'dotenv';
config();
import StateManager from './base/StateManager';
import bot from './bot/Bot';
import Dashboard, { main as dashboard } from './dashboard/App';

(async () => {
    while (typeof (StateManager.connection) == 'undefined') {
        await new Promise(r => setTimeout(r, 500));
    }
    await bot();
    await dashboard();
    Dashboard.listen(process.env.DASHBOARD_PORT || 3000, () => {
        console.log('[Dashboard] running on port ', process.env.DASHBOARD_PORT || 3000);
    });
})();