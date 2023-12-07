const weekEntryModel = require('../../models/weekEntry');

async function loadWeekEntry(entryId) {
    try {
        const entrySelected = await weekEntryModel.findOne({ entryId: entryId });

        if (entrySelected) {
            return entrySelected;
        } else {
            return {
                status: "error",
                errorId: "getentry_1",
                message: "ENTRY_NOT_FOUND"
            }
        }

    } catch (error) {
        return error;
    }
}

module.exports = loadWeekEntry;