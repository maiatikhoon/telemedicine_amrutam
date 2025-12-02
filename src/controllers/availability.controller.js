
const AvailabilityService = require("../services/availability.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");


module.exports.createAvailability = asyncErrorHandler(async (req, res) => {

    const { doctorId, date, start_time, end_time } = req.body;
    const slot = await AvailabilityService.createSlot({ doctorId, date, start_time, end_time });
    return res.status(200).json({ status: 201, data: slot, message: "Slot created successfully" });
})

module.exports.listAllSlots = asyncErrorHandler(async (req, res) => {

    const { doctorId, date, availableOnly } = req.query;

    const filters = {
        doctorId: doctorId,
        date: date,
        availableOnly: availableOnly !== 'false',
    };

    const data = await AvailabilityService.listSlots(filters, req.pagination);

    return res.status(200).json({ status: 200, data, message: "all slots found successfully" });
})

module.exports.getSlotById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const record = await AvailabilityService.getSlotById(id);

    return res.status(200).json({ status: 200, data: record, message: "slot found successfully" });
})

module.exports.removeSlot = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    await AvailabilityService.deleteSlot(id);
    return res.status(200).json({ status: 200, message: "slot deleted successfully" });

})

module.exports.bookSlot = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const slot = await AvailabilityService.markBooked(id);

    return res.status(200).json({ status: 200, data: slot, message: "slot booked successfully" });
})


