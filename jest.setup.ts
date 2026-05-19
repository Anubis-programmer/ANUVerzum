import { installSyncScheduler } from './src/testing/act';
import { setupAutoCleanup }     from './src/testing/cleanup';

process.env.NODE_ENV = 'test';
installSyncScheduler();
setupAutoCleanup();
