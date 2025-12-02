

const _userType = {
    user: "user",
    doctor: "doctor",
    admin: "admin",
}

const _consultationStatus = {
    booked: "booked",
    ongoing: "ongoing",
    completed: "completed",
    cancelled: "cancelled",
}

const _paymentStatus = { 
    pending : "pending" , 
    success: "success",
    failed: "failed",
    refunded: "refunded",
}

module.exports = { _userType, _consultationStatus, _paymentStatus }; 