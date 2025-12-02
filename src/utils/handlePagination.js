

module.exports.handlePagination = (req, res, next) => {

    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");

    const offset = (page - 1) * limit;

    const sortField = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";

    req.pagination = { page, offset, limit, order: [[sortField, sortOrder]] };

    next();
};
