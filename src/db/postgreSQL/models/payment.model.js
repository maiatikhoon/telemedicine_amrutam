const { _paymentStatus } = require("../../../utils/constants");

module.exports = (sequelize, DataTypes) => { 

    const Payment = sequelize.define("Payment", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        consultation_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(_paymentStatus.success , _paymentStatus.failed , _paymentStatus.refunded , _paymentStatus.pending ),
            defaultValue: _paymentStatus.pending
        },
        txn_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "payments",
        timestamps: true
    });

    return Payment;
};
