const weekEntryModel = require('../../models/weekEntry');

async function createWeekEntry(week, churchId, decimists, offers) {
    
    const entryId = `enrtadas-${week}-${churchId}`;

    var tenths = 0;

    decimists.forEach(decimist => {
        tenths += parseFloat(decimist.tenth);
    });

    var totalEntries = parseFloat(tenths) + parseFloat(offers);

    try {
        const entryCreated = await weekEntryModel.create(
            {
                entryId,
                churchId,
                week,
                decimists,
                tenths,
                offers,
                totalEntries,
                isUsed: false
            }
        );

        return entryCreated;
    } catch (error) {
        return error;
    }

}

module.exports = createWeekEntry;