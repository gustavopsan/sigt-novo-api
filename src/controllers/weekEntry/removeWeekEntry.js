const weekEntryModel = require('../../models/weekEntry');

async function removeWeekEntry(id) {
    try {
        const removedEntry = await weekEntryModel.findByIdAndDelete(id);

        return removedEntry;
    } catch (error) {
        return error;
    }
}

module.exports = removeWeekEntry;