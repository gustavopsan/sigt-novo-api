const weekEntryModel = require('../../models/weekEntry');

async function listWeekEntries() {
    try {
        const entries = await weekEntryModel.find();
        return entries;
    } catch (error) {
        return error;
    }
}

module.exports = listWeekEntries;