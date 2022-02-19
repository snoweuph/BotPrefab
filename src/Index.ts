import { config } from 'dotenv';
config();
import Bot from './bot/Bot';
import Dashboard, { main } from './dashboard/App';

Bot();

main();
Dashboard.listen(process.env.DASHBOARD_PORT || 3000, () => {
    console.log('Server on port', process.env.DASHBOARD_PORT || 3000);
});
