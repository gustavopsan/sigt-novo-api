const weekEntryModel = require('../../models/weekEntry');

async function updateWeekEntry(id, key, newvalue) {

    if (key === "decimist") {
        try {
            const weekEntry = await weekEntryModel.findByIdAndUpdate(
                { _id: id },
                { $push: { decimists: newvalue  }},
                { new: false }
            )

            if (weekEntry) {
                const weekEntryUpdated = await weekEntryModel.findById(
                    { _id: id }
                );
    
                return weekEntryUpdated;
            }
        } catch (error) {
            return error;
        }
    } else {
        try {
            const weekEntry = await weekEntryModel.findByIdAndUpdate(
                { _id: id },
                { [key]: newvalue },
                { new: false }
            )
    
            if (weekEntry) {
                const weekEntryUpdated = await weekEntryModel.findById(
                    { _id: id }
                );
    
                return weekEntryUpdated;
            }
        } catch (error) {
            return error;
        }
    }
    
}

module.exports = updateWeekEntry;